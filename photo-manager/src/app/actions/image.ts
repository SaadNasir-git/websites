"use server";

import { auth } from "@clerk/nextjs/server";
import pool from "@/lib/db";
import { deleteImage } from "./cloudinary";
import { revalidatePath } from "next/cache";

export async function deleteImageAction(id: string, publicId: string) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    // Verify ownership
    const [rows] = await pool.query(
        "SELECT * FROM Image WHERE id = ? AND userId = ?",
        [id, userId]
    );

    if ((rows as { id: string }[]).length === 0) {
        throw new Error("Image not found or unauthorized");
    }

    // Delete from Cloudinary
    try {
        await deleteImage(publicId);
    } catch (error) {
        console.error("Cloudinary delete failed:", error);
        // Continue to delete from DB even if Cloudinary fails (to clean up)
    }

    // Delete from DB
    await pool.query("DELETE FROM Image WHERE id = ?", [id]);

    revalidatePath("/dashboard");
}
