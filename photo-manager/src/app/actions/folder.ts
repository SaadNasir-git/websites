"use server";

import { auth } from "@clerk/nextjs/server";
import pool from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

export async function createFolder(name: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const id = uuidv4();
    await pool.query(
        "INSERT INTO Folder (id, name, userId) VALUES (?, ?, ?)",
        [id, name, userId]
    );

    revalidatePath("/dashboard");
    return { id, name };
}

export async function getFolders() {
    const { userId } = await auth();
    if (!userId) return [];

    const [rows] = await pool.query(
        "SELECT * FROM Folder WHERE userId = ? ORDER BY createdAt DESC",
        [userId]
    );
    return rows as { id: string; name: string; createdAt: Date }[];
}

export async function moveImage(imageId: string, folderId: string | null) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Verify ownership of image
    const [imageRows] = await pool.query(
        "SELECT * FROM Image WHERE id = ? AND userId = ?",
        [imageId, userId]
    );
    if ((imageRows as any[]).length === 0) throw new Error("Image not found");

    // Verify ownership of folder if not null
    if (folderId) {
        const [folderRows] = await pool.query(
            "SELECT * FROM Folder WHERE id = ? AND userId = ?",
            [folderId, userId]
        );
        if ((folderRows as any[]).length === 0) throw new Error("Folder not found");
    }

    await pool.query(
        "UPDATE Image SET folderId = ? WHERE id = ?",
        [folderId, imageId]
    );

    revalidatePath("/dashboard");
}

export async function deleteFolder(folderId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Verify ownership
    const [rows] = await pool.query(
        "SELECT * FROM Folder WHERE id = ? AND userId = ?",
        [folderId, userId]
    );
    if ((rows as any[]).length === 0) throw new Error("Folder not found");

    await pool.query("DELETE FROM Folder WHERE id = ?", [folderId]);

    revalidatePath("/dashboard");
}
