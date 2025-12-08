import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { UploadDialog } from "@/components/upload-dialog";
import { ImageGrid } from "@/components/image-grid";
import { getFolders } from "@/app/actions/folder";
import { FolderManager } from "@/components/folder-manager";

interface DashboardProps {
  searchParams: Promise<{ folder?: string }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const resolvedSearchParams = await searchParams;
  const currentFolderId = resolvedSearchParams.folder || null;

  // Fetch folders
  const folders = await getFolders();

  // Fetch images based on folder
  let query = "SELECT * FROM Image WHERE userId = ?";
  const params: any[] = [userId];

  if (currentFolderId) {
    query += " AND folderId = ?";
    params.push(currentFolderId);
  } else {
    // Optional: if "All Photos" should show everything, do nothing.
    // If "All Photos" means "Uncategorized", use: query += " AND folderId IS NULL";
    // For now, let's assume "All Photos" shows everything.
  }

  query += " ORDER BY createdAt DESC";

  const [rows] = await pool.query(query, params);

  const images = (rows as any[]).map((row) => ({
    ...row,
    createdAt: row.createdAt.toISOString(),
  }));

  const currentFolderName = currentFolderId
    ? folders.find(f => f.id === currentFolderId)?.name || "Unknown Folder"
    : "All Photos";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <FolderManager
          folders={folders.map(f => ({ ...f, createdAt: f.createdAt.toISOString() }))}
          currentFolderId={currentFolderId}
        />

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{currentFolderName}</h1>
              <p className="text-muted-foreground mt-1">
                {images.length} {images.length === 1 ? 'photo' : 'photos'}
              </p>
            </div>
            <UploadDialog folderId={currentFolderId} />
          </div>

          <ImageGrid images={images} folders={folders.map(f => ({ ...f, createdAt: f.createdAt.toISOString() }))} />
        </div>
      </div>
    </div>
  );
}