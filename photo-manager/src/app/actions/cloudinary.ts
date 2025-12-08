"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) {
        throw new Error("No file uploaded");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<{ publicId: string; url: string }>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: "photo-manager" }, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({
                    publicId: result!.public_id,
                    url: result!.secure_url,
                });
            })
            .end(buffer);
    });
}

export async function deleteImage(publicId: string) {
    return new Promise<void>((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
