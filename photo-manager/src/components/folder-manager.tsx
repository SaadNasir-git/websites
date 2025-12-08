"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Folder, FolderOpen, Trash2 } from "lucide-react";
import { createFolder, deleteFolder } from "@/app/actions/folder";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
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

import { useRouter } from "next/navigation";

interface FolderManagerProps {
    folders: { id: string; name: string; createdAt: string }[];
    currentFolderId: string | null;
}

export function FolderManager({ folders, currentFolderId }: FolderManagerProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState<string | null>(null);
    const router = useRouter();

    const onSelectFolder = (id: string | null) => {
        if (id) router.push(`/dashboard?folder=${id}`);
        else router.push("/dashboard");
    };

    async function handleCreateFolder() {
        if (!newFolderName.trim()) return;
        setIsCreating(true);
        try {
            await createFolder(newFolderName);
            setNewFolderName("");
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to create folder", error);
        } finally {
            setIsCreating(false);
        }
    }

    async function handleDeleteFolder() {
        if (!folderToDelete) return;

        try {
            await deleteFolder(folderToDelete);
            if (currentFolderId === folderToDelete) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Failed to delete folder", error);
            alert("Failed to delete folder");
        } finally {
            setFolderToDelete(null);
        }
    }

    return (
        <div className="w-full md:w-64 shrink-0 space-y-4">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-semibold tracking-tight">Folders</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Folder</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <Input
                                placeholder="Folder Name"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateFolder} disabled={isCreating}>
                                {isCreating ? "Creating..." : "Create"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-1">
                <Button
                    variant={currentFolderId === null ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onSelectFolder(null)}
                >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    All Photos
                </Button>
                {folders.map((folder) => (
                    <div key={folder.id} className="flex items-center group relative">
                        <Button
                            variant={currentFolderId === folder.id ? "secondary" : "ghost"}
                            className="w-full justify-start pr-8"
                            onClick={() => onSelectFolder(folder.id)}
                        >
                            <Folder className="mr-2 h-4 w-4" />
                            <span className="truncate">{folder.name}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                                e.stopPropagation();
                                setFolderToDelete(folder.id);
                            }}
                            title="Delete Folder"
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                ))}
            </div>

            <AlertDialog open={!!folderToDelete} onOpenChange={(open) => !open && setFolderToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Folder?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will delete the folder "{folders.find(f => f.id === folderToDelete)?.name}".
                            Images inside will NOT be deleted, but moved to "All Photos".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteFolder} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
