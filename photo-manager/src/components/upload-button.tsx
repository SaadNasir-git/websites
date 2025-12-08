"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/app/actions/cloudinary";
import { Loader2 } from "lucide-react";

export function UploadButton() {
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const result = await uploadImage(formData);

            // Save to DB via API route (to be created) or Server Action
            await fetch("/api/images", {
                method: "POST",
                body: JSON.stringify(result),
            });

            router.refresh();
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed");
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="relative">
            <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                onChange={handleUpload}
                disabled={isUploading}
            />
            <Button disabled={isUploading}>
                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Upload Image
            </Button>
        </div>
    );
}
