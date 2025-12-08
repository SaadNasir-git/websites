import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { publicId, url, folderId } = await req.json();

        // Ensure user exists in DB
        await pool.query(
            "INSERT IGNORE INTO User (id, email) VALUES (?, ?)",
            [userId, "placeholder@email.com"] // Clerk handles email, we just need the ID for FK
        );

        const id = uuidv4();
        await pool.query(
            "INSERT INTO Image (id, publicId, url, userId, folderId) VALUES (?, ?, ?, ?, ?)",
            [id, publicId, url, userId, folderId || null]
        );

        return NextResponse.json({ id, publicId, url, userId, folderId });
    } catch (error) {
        console.error("[IMAGES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
