"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "./upload-dropzone";
import { Upload } from "lucide-react";
import { useState } from "react";

interface UploadDialogProps {
    folderId: string | null;
}

export function UploadDialog({ folderId }: UploadDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Images
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Upload Images</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <UploadDropzone folderId={folderId} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
