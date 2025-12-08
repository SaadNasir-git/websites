"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Maximize2, Calendar, Link as LinkIcon, FolderInput } from "lucide-react";
import { deleteImageAction } from "@/app/actions/image";
import { moveImage } from "@/app/actions/folder";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface ImageGridProps {
    images: {
        id: string;
        url: string;
        publicId: string;
        createdAt: string;
        folderId: string | null;
    }[];
    folders: { id: string; name: string; createdAt: string }[];
}

export function ImageGrid({ images, folders }: ImageGridProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [imageToDelete, setImageToDelete] = useState<{ id: string, publicId: string } | null>(null);

    async function handleDelete() {
        if (!imageToDelete) return;

        setDeletingId(imageToDelete.id);
        try {
            await deleteImageAction(imageToDelete.id, imageToDelete.publicId);
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Delete failed. Please try again.");
        } finally {
            setDeletingId(null);
            setImageToDelete(null);
        }
    }

    async function handleMove(imageId: string, folderId: string | null) {
        try {
            await moveImage(imageId, folderId);
        } catch (error) {
            console.error("Move failed:", error);
            alert("Failed to move image.");
        }
    }

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    };

    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-muted/50">
                <div className="p-4 rounded-full bg-muted mb-4">
                    <Maximize2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No images yet</h3>
                <p className="text-muted-foreground max-w-sm mt-2">
                    Upload your first image to get started with your gallery.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                    <div key={image.id} className="group relative bg-card rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-all duration-200">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="aspect-square relative cursor-zoom-in overflow-hidden">
                                    <img
                                        src={image.url}
                                        alt="User image"
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                                <DialogTitle className="sr-only">Image Preview</DialogTitle>
                                <div className="relative w-full h-[80vh] flex items-center justify-center">
                                    <img
                                        src={image.url}
                                        alt="Full screen preview"
                                        className="w-full h-full object-contain"
                                    />
                                    <DialogClose className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors">
                                        <span className="sr-only">Close</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </DialogClose>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <div className="p-3 flex items-center justify-between gap-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(image.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex gap-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Move to Folder">
                                            <FolderInput className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Move to...</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleMove(image.id, null)}>
                                            All Photos
                                        </DropdownMenuItem>
                                        {folders.map((folder) => (
                                            <DropdownMenuItem key={folder.id} onClick={() => handleMove(image.id, folder.id)}>
                                                {folder.name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                    onClick={() => copyToClipboard(image.url)}
                                    title="Copy Link"
                                >
                                    <LinkIcon className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => setImageToDelete({ id: image.id, publicId: image.publicId })}
                                    disabled={deletingId === image.id}
                                    title="Delete Image"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AlertDialog open={!!imageToDelete} onOpenChange={(open) => !open && setImageToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the image from your gallery.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
