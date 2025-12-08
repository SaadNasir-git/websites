import { NextResponse } from 'next/server';
import { sqlconnection } from '@/lib/mysql2';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { validateProduct } from '@/actions/product';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants/image';
import { ResultSetHeader } from 'mysql2';

// Configure Cloudinary once at the top-level
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export interface ImageUploadResult {
    publicUrl: string;
    secureUrl: string;
}

export class Image {
    static async uploadFile(file: File): Promise<ImageUploadResult> {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    quality: 'auto',
                    fetch_format: 'auto',
                },
                (error, result) => {
                    if (error) {
                        reject(new Error(`Upload failed for ${file.name}: ${error.message}`));
                        return;
                    }
                    if (!result) {
                        reject(new Error(`Upload failed for ${file.name}: No result returned`));
                        return;
                    }
                    resolve(result);
                }
            ).end(buffer);
        });

        return {
            publicUrl: uploadResult.public_id,
            secureUrl: uploadResult.secure_url
        };
    }

    static async uploadMultiple(files: File[]): Promise<ImageUploadResult[]> {
        const uploadPromises = files.map(file => this.uploadFile(file));
        return Promise.all(uploadPromises);
    }

    static async deletefile(publicId: string) {
        await cloudinary.uploader.destroy(publicId);
    }
}


export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const image = formData.get('image') as File | null;
        const productData = formData.get('product') as string | null;

        if (!productData) {
            return NextResponse.json({ error: 'Missing product data' }, { status: 400 });
        }

        const product: ProductFormData = JSON.parse(productData);

        const validationError = validateProduct(product);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        if (!image) {
            return NextResponse.json({ error: 'Product image is required' }, { status: 400 });
        }

        if (image.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: 'Image size exceeds 10MB limit' }, { status: 400 });
        }

        if (!ALLOWED_FILE_TYPES.includes(image.type)) {
            return NextResponse.json({ error: 'Invalid image type' }, { status: 400 });
        }

        // Upload to Cloudinary
        const imageResult = await Image.uploadFile(image);

        // Insert into MySQL
        const [result] = await sqlconnection.query<ResultSetHeader>(
            'INSERT INTO products (name, description, category, minStock, imagePublicUrl, imageSecureUrl, tags) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                product.name,
                product.description || '',
                product.category || '',
                Number(product.minStock),
                imageResult.publicUrl,
                imageResult.secureUrl,
                JSON.stringify(product.tags || []),
            ]
        );

        return NextResponse.json({
            success: true,
            message: 'Product added successfully',
            data: { id: result.insertId, ...product, image: imageResult.publicUrl, secureImage: imageResult.secureUrl },
        });
    } catch (error: any) {
        console.error('Error adding product:', error);
        return NextResponse.json(
            { error: 'Failed to add product', details: error.message },
            { status: 500 }
        );
    }
}
