"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Upload, X, AlertCircle, Loader2, Triangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';
import { uploadImage } from '@/app/actions/cloudinary';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_FILE_SIZE = 1024; // 1KB
const COMPRESSION_THRESHOLD = 2 * 1024 * 1024; // 2MB

const CLOUDINARY_SUPPORTED_FORMATS = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'ico',
    'webp', 'svg', 'avif', 'jxl', 'jp2', 'j2k', 'wdp', 'hdp', 'heic', 'heif'
];

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

interface UploadDropzoneProps {
    folderId: string | null;
}

export function UploadDropzone({ folderId }: UploadDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const compressImage = async (file: File): Promise<File | null> => {
        try {
            const targetSizeMB = 9.5;
            let quality = 0.9;
            let maxWidthOrHeight = 3840;

            const currentSizeMB = file.size / (1024 * 1024);
            const reductionNeeded = currentSizeMB / targetSizeMB;

            if (reductionNeeded > 3) {
                quality = 0.5;
                maxWidthOrHeight = 1920;
            } else if (reductionNeeded > 2) {
                quality = 0.7;
                maxWidthOrHeight = 2560;
            } else if (reductionNeeded > 1.5) {
                quality = 0.8;
                maxWidthOrHeight = 3000;
            }

            const options = {
                maxSizeMB: targetSizeMB,
                maxWidthOrHeight: maxWidthOrHeight,
                useWebWorker: true,
                fileType: file.type,
                initialQuality: quality,
                alwaysKeepResolution: true,
            };

            return await imageCompression(file, options);
        } catch (error) {
            console.error("Compression failed", error);
            return null;
        }
    };

    const handleFiles = async (files: FileList) => {
        setIsUploading(true);
        setUploadProgress("Processing files...");

        const filesArray = Array.from(files);
        let successCount = 0;
        let errorCount = 0;

        for (const file of filesArray) {
            try {
                setUploadProgress(`Uploading ${file.name}...`);

                let fileToUpload = file;

                // Validation
                if (file.size > MAX_FILE_SIZE) {
                    const compressed = await compressImage(file);
                    if (compressed && compressed.size <= MAX_FILE_SIZE) {
                        fileToUpload = compressed;
                    } else {
                        toast.error(`File ${file.name} is too large`);
                        errorCount++;
                        continue;
                    }
                }

                if (!CLOUDINARY_SUPPORTED_FORMATS.some(fmt => file.name.toLowerCase().endsWith(fmt))) {
                    toast.error(`Format not supported: ${file.name}`);
                    errorCount++;
                    continue;
                }

                // Upload to Cloudinary
                const formData = new FormData();
                formData.append("file", fileToUpload);
                const result = await uploadImage(formData);

                // Save to DB
                await fetch("/api/images", {
                    method: "POST",
                    body: JSON.stringify({ ...result, folderId }),
                });

                successCount++;
            } catch (error) {
                console.error(`Failed to upload ${file.name}`, error);
                toast.error(`Failed to upload ${file.name}`);
                errorCount++;
            }
        }

        setIsUploading(false);
        setUploadProgress("");

        if (successCount > 0) {
            toast.success(`Successfully uploaded ${successCount} images`);
            router.refresh();
        }
        if (errorCount > 0) {
            toast.warning(`${errorCount} files failed to upload`);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    return (
        <TooltipProvider>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Upload Images</CardTitle>
                    <CardDescription>
                        Drag and drop multiple images here. Supported formats: JPG, PNG, WEBP, etc.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        className={cn(
                            "border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer p-8",
                            isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/25 hover:border-primary/50',
                            isUploading && 'opacity-50 cursor-not-allowed'
                        )}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                        onDrop={handleDrop}
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                    >
                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept={CLOUDINARY_SUPPORTED_FORMATS.map(f => `.${f}`).join(',')}
                            multiple
                            className="hidden"
                            disabled={isUploading}
                            onChange={handleFileInput}
                        />

                        {isUploading ? (
                            <div className="flex flex-col items-center">
                                <Loader2 className="h-12 w-12 text-primary mb-4 animate-spin" />
                                <p className="text-sm font-medium">{uploadProgress}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-sm text-muted-foreground">
                                    Drag & drop or click to browse
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Max size: {MAX_FILE_SIZE / 1024 / 1024}MB
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </TooltipProvider>
    );
}
