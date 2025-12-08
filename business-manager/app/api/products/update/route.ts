import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/constants/image";
import { Image , ImageUploadResult } from "../add/route";
import { NextResponse } from "next/server";
import { validateProduct } from "@/actions/product";
import { sqlconnection } from "@/lib/mysql2";
import { v2 as cloudinary } from 'cloudinary';
import { ResultSetHeader } from "mysql2";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function POST(request: Request) {
    try {
        const formdata = await request.formData();
        const image = formdata.get('formImage') as File | string | null;
        const productData = formdata.get('product') as string | null;

        if (!productData) {
            return NextResponse.json({ error: 'Missing product data' }, { status: 400 });
        }

        const product: Product = JSON.parse(productData);

        let ImageUploadResult: ImageUploadResult = {
            publicUrl: product.image,
            secureUrl: product.secureImage
        }
        const values = [product.name, product.description, product.category, Number(product.minStock), JSON.stringify(product.tags || [])];
        let updateClause = 'SET name = ? , description = ? , category = ? , minStock = ? , tags = ?'

        const validationError = validateProduct(product);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        if (typeof (image) !== 'string') {
            if (!image) {
                return NextResponse.json({ error: 'Product image is required' }, { status: 400 });
            }

            if (image.size > MAX_FILE_SIZE) {
                return NextResponse.json({ error: 'Image size exceeds 10MB limit' }, { status: 400 });
            }

            if (!ALLOWED_FILE_TYPES.includes(image.type)) {
                return NextResponse.json({ error: 'Invalid image type' }, { status: 400 });
            }
            Image.deletefile(product.image);
            ImageUploadResult = await Image.uploadFile(image);
            updateClause += ' , imagePublicUrl = ? , imageSecureUrl = ? '
            values.push(ImageUploadResult.publicUrl, ImageUploadResult.secureUrl);
        }

        values.push(product.id)

        await sqlconnection.query<ResultSetHeader>(`UPDATE products ${updateClause} WHERE id = ?`, values);

        return NextResponse.json({
            success: true,
            message: 'Product updated successfully',
            data: { ...product, image: ImageUploadResult.publicUrl, secureImage: ImageUploadResult.secureUrl },
        })

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error updating product:', error);
            return NextResponse.json(
                { error: 'Failed to add product', details: error.message },
                { status: 500 }
            );
        }
    }
}