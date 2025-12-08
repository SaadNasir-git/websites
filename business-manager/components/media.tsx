import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Upload, X, AlertCircle, Loader2, Triangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify'

interface ProductMediaProps {
    image: File | null | string;
    updateImages: (images: File | null) => void;
    isVariant?: Boolean;
    errors?: Record<string, string>;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_FILE_SIZE = 1024; // 1KB - Reduced from 1KB to accept small images
const COMPRESSION_THRESHOLD = 2 * 1024 * 1024; // 2MB - compress files larger than this

// Cloudinary supported image formats
const CLOUDINARY_SUPPORTED_FORMATS = [
    // Standard formats
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'ico',
    // Web formats
    'webp', 'svg',
    // Advanced formats
    'avif', 'jxl', 'jp2', 'j2k', 'wdp', 'hdp', 'heic', 'heif'
];

// MIME types for Cloudinary supported formats
const CLOUDINARY_MIME_TYPES = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp',
    'image/tiff', 'image/tif', 'image/x-icon', 'image/webp', 'image/svg+xml',
    'image/avif', 'image/jxl', 'image/jp2', 'image/jpx', 'image/jpm',
    'image/heic', 'image/heif', 'image/heif-sequence'
];

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

export function ProductMedia({ image, updateImages, errors }: ProductMediaProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [compressing, setCompressing] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [originalFileSize, setOriginalFileSize] = useState<number | null>(null);

    // Image compression function
    const compressImage = async (file: File): Promise<File | null> => {
        try {
            // Only compress enough to get under 10MB, don't over-compress
            const targetSizeMB = 9.5; // Target slightly under 10MB to be safe
            let quality = 0.9; // Start with high quality
            let maxWidthOrHeight = 3840; // Start with high resolution

            // Calculate how much we need to reduce
            const currentSizeMB = file.size / (1024 * 1024);
            const reductionNeeded = currentSizeMB / targetSizeMB;

            // Adjust quality based on how much reduction is needed
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

            const compressedFile = await imageCompression(file, options);

            // If still too large, try one more time with slightly more compression
            if (compressedFile.size > MAX_FILE_SIZE) {
                const secondTryOptions = {
                    maxSizeMB: targetSizeMB,
                    maxWidthOrHeight: Math.floor(maxWidthOrHeight * 0.8),
                    useWebWorker: true,
                    fileType: file.type,
                    initialQuality: quality * 0.8,
                    alwaysKeepResolution: true,
                };

                const secondTryCompressed = await imageCompression(file, secondTryOptions);
                return secondTryCompressed.size <= MAX_FILE_SIZE ? secondTryCompressed : null;
            }

            return compressedFile;
        } catch (error) {
            return null;
        }
    };

    const isCloudinarySupported = (file: File): boolean => {
        // Check by file extension first (more reliable)
        const extension = file.name.toLowerCase().split('.').pop() || '';
        if (CLOUDINARY_SUPPORTED_FORMATS.includes(extension)) {
            return true;
        }

        // Check by MIME type as fallback
        if (CLOUDINARY_MIME_TYPES.includes(file.type)) {
            return true;
        }
        return false;
    }

    const validateFile = (file: File): string | null => {
        // Check file size first and most importantly
        if (file.size > MAX_FILE_SIZE) {
            return `File "${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`;
        }

        if (file.size < MIN_FILE_SIZE) { // Very small files (less than 100 bytes) are likely corrupted
            return `File "${file.name}" is too small or corrupted.`;
        }

        if (!isCloudinarySupported(file)) {
            const supportedFormats = CLOUDINARY_SUPPORTED_FORMATS.join(', ').toUpperCase();
            return `File "${file.name}" is not a supported format. Cloudinary supports: ${supportedFormats}`;
        }

        return null;
    }

    const handleFiles = async (files: FileList) => {
        setCompressing(true);
        let validFile: File | null = null;
        const validationErrors: string[] = [];
        const duplicateFiles: string[] = [];
        const compressedFiles: string[] = [];
        let newOriginalSize: number | null;

        try {
            // Process files sequentially to check for duplicates and compress
            for (const file of Array.from(files)) {
                // Store original size for comparison
                let originalSize = file.size;
                let processedFile = file;
                let wasCompressed = false;

                // Validate file size and basic properties BEFORE any processing
                const validationError = validateFile(file);
                if (validationError) {
                    validationErrors.push(validationError);

                    // If file is too large, try compression as last resort
                    if (file.size > MAX_FILE_SIZE) {
                        try {
                            const compressedFile = await compressImage(file);
                            if (compressedFile && compressedFile.size <= MAX_FILE_SIZE) {
                                processedFile = compressedFile;
                                wasCompressed = true;
                                compressedFiles.push(file.name);
                            }
                        } catch (error) {
                            // Compression failed, file will be rejected
                        }
                    }
                    if (!wasCompressed) {
                        continue;
                    }
                }

                // If file passed initial validation or was successfully compressed, continue processing
                if (!wasCompressed) {
                    // Check if file is Cloudinary supported
                    if (!isCloudinarySupported(file)) {
                        const supportedFormats = CLOUDINARY_SUPPORTED_FORMATS.join(', ').toUpperCase();
                        const error = `File "${file.name}" is not supported. Cloudinary supports: ${supportedFormats}`;
                        validationErrors.push(error);
                        continue;
                    }

                    // Compress image if needed
                    if (file.size > COMPRESSION_THRESHOLD) {
                        try {
                            const compressedFile = await compressImage(file);
                            if (compressedFile) {
                                processedFile = compressedFile;
                                wasCompressed = true;
                                compressedFiles.push(file.name);
                            }
                        } catch (error) {
                            // Continue with original file if compression fails
                        }
                    }
                }

                // Final validation after compression
                const finalValidationError = validateFile(processedFile);
                if (finalValidationError) {
                    validationErrors.push(finalValidationError);
                } else {
                    // validFiles.push(processedFile);
                    validFile = processedFile
                    // newOriginalSizes.push(originalSize);
                    newOriginalSize = originalFileSize
                }
            }

            // Show errors for duplicate files
            if (duplicateFiles.length > 0) {
                toast.warning(`Skipped ${duplicateFiles.length} duplicate images`);
            }

            // Show errors for invalid files
            if (validationErrors.length > 0) {
                toast.error(`Failed to process ${validationErrors.length} files`);
            }

            // Process valid files
            if (validFile) {
                setOriginalFileSize(newOriginalSize!)
                updateImages(validFile);

                if (compressedFiles.length > 0) {
                    toast.success(`Compressed ${compressedFiles.length} large images`);
                }
            } else if (files.length > 0 && validationErrors.length === 0 && duplicateFiles.length === 0) {
                toast.error('No valid image files were found. Please check file formats and sizes.');
            }
        } finally {
            setCompressing(false);
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log('File input files:', Array.from(e.target.files).map(f => `${f.name} (${(f.size / 1024).toFixed(2)}KB)`));
            handleFiles(e.target.files)
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleDragOverUpload = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeaveUpload = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDropUpload = async (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const droppedFiles: File[] = [];
        const items = e.dataTransfer.items;

        console.log('Dropped items:', Array.from(items).map(item => ({
            kind: item.kind,
            type: item.type
        })));

        let hasProcessedFiles = false;
        let hasProcessedHTML = false;

        // Special handling for Google Images - look for the actual file
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file) {
                    console.log('Found file:', file.name, file.type, (file.size / 1024).toFixed(2) + 'KB');
                    hasProcessedFiles = true;

                    // For Google Images, the file might have a generic name but correct type
                    if (file.type.startsWith('image/')) {
                        // Create a better filename for Google images
                        let betterFileName = file.name;
                        if (file.name === 'image' || file.name === 'blob' || !file.name.includes('.')) {
                            const extension = file.type.split('/')[1] || 'jpg';
                            betterFileName = `google-image-${Date.now()}.${extension}`;
                        }

                        const betterFile = new File([file], betterFileName, { type: file.type });
                        droppedFiles.push(betterFile);
                        console.log('✅ Added image file for processing:', betterFileName);
                    } else {
                        console.log('❌ Skipped non-image file:', file.name, file.type);
                    }
                }
            }
        }

        // If no files found via file items, try HTML extraction
        if (droppedFiles.length === 0) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.kind === 'string' && item.type === 'text/html') {
                    try {
                        console.log('Processing HTML content as fallback...');
                        const html = await new Promise<string>((resolve) => {
                            item.getAsString(resolve);
                        });

                        const extractedFiles = await extractImages(html);
                        console.log(`Extracted ${extractedFiles.length} images from HTML`);

                        if (extractedFiles.length > 0) {
                            droppedFiles.push(...extractedFiles);
                            hasProcessedHTML = true;
                            hasProcessedFiles = true;
                            break; // Stop after first successful HTML extraction
                        }
                    } catch (error) {
                        console.error('Error processing HTML content:', error);
                    }
                }
            }
        }

        // Last resort: try to get any image data from the dataTransfer directly
        if (droppedFiles.length === 0 && e.dataTransfer.files.length > 0) {
            console.log('Trying direct dataTransfer.files access:', Array.from(e.dataTransfer.files));
            for (const file of Array.from(e.dataTransfer.files)) {
                if (file.type.startsWith('image/')) {
                    droppedFiles.push(file);
                    hasProcessedFiles = true;
                    console.log('✅ Added image from dataTransfer.files:', file.name);
                }
            }
        }

        console.log('Final dropped files to process:', droppedFiles.map(f => `${f.name} (${(f.size / 1024).toFixed(2)}KB)`));

        if (droppedFiles.length > 0) {
            // Create a FileList-like object
            const dataTransfer = new DataTransfer();
            droppedFiles.forEach(file => dataTransfer.items.add(file));
            console.log(`Processing ${droppedFiles.length} files through handleFiles`);
            handleFiles(dataTransfer.files);
        } else {
            // Enhanced error message with debugging info
            const supportedFormats = CLOUDINARY_SUPPORTED_FORMATS.join(', ').toUpperCase();
            let errorMessage = `No supported image files found.\n\nSupported formats: ${supportedFormats}\n\n`;

            // Add debugging information
            errorMessage += `Debug info:\n`;
            errorMessage += `- Items count: ${items.length}\n`;
            errorMessage += `- DataTransfer files: ${e.dataTransfer.files.length}\n`;
            errorMessage += `- Item types: ${Array.from(items).map(item => `${item.kind}/${item.type}`).join(', ')}\n\n`;

            if (hasProcessedFiles) {
                errorMessage += "The dropped files were not recognized as supported image formats or were invalid.";
            } else if (hasProcessedHTML) {
                errorMessage += "No images could be extracted from the dropped content.";
            } else {
                errorMessage += "Please drag and drop actual image files from your computer.\n\nNote: For best results, use the file browser to select images.\n\n";
                errorMessage += "💡 Tip: Some websites (like Google Images) may restrict direct image dragging. Try downloading the image first, then uploading it via file browser.";
            }

            alert(errorMessage);
            console.log('Drop error:', errorMessage);
            console.log('Full items details:', Array.from(items));
            console.log('DataTransfer files:', Array.from(e.dataTransfer.files));
        }
    }

    const extractImages = async (html: string): Promise<File[]> => {
        const files: File[] = [];
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Look for img elements
        const imgElements = tempDiv.getElementsByTagName('img');

        console.log(`Found ${imgElements.length} img elements in HTML`);

        // Also look for meta tags that might contain image info
        const metaElements = tempDiv.getElementsByTagName('meta');
        console.log(`Found ${metaElements.length} meta elements in HTML`);

        // Process regular img elements - try both data URLs and http URLs
        for (let j = 0; j < imgElements.length; j++) {
            const imgElement = imgElements[j];
            const imgSrc = imgElement.src;

            if (imgSrc && imgSrc.startsWith('data:')) {
                try {
                    console.log('Processing data URL image');
                    const imageFile = await dataUrlToFile(imgSrc, `google-image-${Date.now()}-${j}.png`);
                    if (imageFile) {
                        files.push(imageFile);
                        console.log('✅ Successfully added image from data URL:', imageFile.name, `(${(imageFile.size / 1024).toFixed(2)}KB)`);
                    }
                } catch (error) {
                    console.error('Error processing data URL image:', error);
                }
            } else if (imgSrc && imgSrc.startsWith('http')) {
                console.log('Found HTTP image source, attempting to fetch:', imgSrc.substring(0, 100) + '...');
                // Try to fetch the image despite CORS - it might work for some origins
                try {
                    const response = await fetch(imgSrc, { mode: 'cors' });
                    if (response.ok) {
                        const blob = await response.blob();
                        const fileName = `google-image-${Date.now()}-${j}.jpg`;
                        const file = new File([blob], fileName, { type: blob.type });
                        files.push(file);
                        console.log('✅ Successfully fetched HTTP image:', fileName);
                    } else {
                        console.log('❌ Failed to fetch HTTP image:', response.status);
                    }
                } catch (error) {
                    console.log('❌ CORS error fetching HTTP image:', error);
                }
            }
        }

        return files;
    }

    // Convert data URL to File

    const dataUrlToFile = (dataUrl: string, filename: string): Promise<File> => {
        return new Promise((resolve, reject) => {
            try {
                // Direct conversion without fetch for data URLs
                const arr = dataUrl.split(',');
                const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                const file = new File([u8arr], filename, { type: mime });
                console.log(`Created file from data URL: ${filename} (${(file.size / 1024).toFixed(2)}KB)`);
                resolve(file);
            } catch (error) {
                console.error('Error converting data URL to file:', error);
                reject(error);
            }
        });
    }

    const removeImage = () => {
        updateImages(null)
    }

    // Generate accept attribute string for file input
    const getAcceptAttribute = () => {
        const extensions = CLOUDINARY_SUPPORTED_FORMATS.map(format => `.${format}`).join(',');
        return `${extensions},image/*`;
    }

    let wasCompressed;
    let compressionRatio;

    if (image && typeof (image) !== 'string') {
        wasCompressed = originalFileSize && originalFileSize > image.size;
        compressionRatio = originalFileSize ? ((originalFileSize - image.size) / originalFileSize * 100).toFixed(1) : 0;
    }

    return (
        <TooltipProvider>
            <Card>
                <CardHeader>
                    <CardTitle>Product Image *</CardTitle>
                    <CardDescription>
                        Upload Product image. One image is required. All images are optimized with Cloudinary.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {errors?.images && (
                            <div className="p-3 border border-red-200 rounded-lg bg-red-50">
                                <div className="flex items-center gap-2 text-red-800">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="text-sm font-medium">{errors.images}</span>
                                </div>
                            </div>
                        )}

                        {/* Upload Area */}
                        <div
                            className={cn(
                                "border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer",
                                image
                                    ? 'p-0'
                                    : 'p-8',
                                isDragging
                                    ? 'border-blue-500 bg-blue-50'
                                    : errors?.images
                                        ? 'border-red-300'
                                        : 'border-gray-300 hover:border-gray-400',
                                compressing && 'opacity-50 cursor-not-allowed'
                            )}
                            onDragOver={handleDragOverUpload}
                            onDragLeave={handleDragLeaveUpload}
                            onDrop={handleDropUpload}
                            onClick={() => !compressing && fileInputRef.current?.click()}
                        >
                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept={getAcceptAttribute()}
                                onChange={handleFileInput}
                                className="hidden"
                                disabled={compressing}
                            />

                            {compressing ? (
                                <>
                                    <Loader2 className="mx-auto h-12 w-12 text-blue-400 mb-4 animate-spin" />
                                    <p className="text-sm text-gray-600">
                                        Compressing images...
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Please wait while we optimize your images for better performance.
                                    </p>
                                </>
                            ) : (
                                <>
                                    {!image ? (
                                        <>
                                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                            <p className="text-sm text-gray-600">
                                                Drag and drop images here, or click to browse
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Cloudinary-optimized formats: JPG, PNG, GIF, WEBP, AVIF, JPEG-XL, SVG, BMP, TIFF, HEIC, etc.
                                            </p>
                                            <p className="text-xs text-blue-600 mt-1 font-medium">
                                                Maximum file size: {MAX_FILE_SIZE / 1024 / 1024}MB per image.
                                            </p>
                                        </>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <div
                                                    className={cn(
                                                        "relative group border-2 rounded-lg transition-all bg-white",
                                                    )}
                                                >
                                                    {/* Image Preview */}
                                                    <img
                                                        src={typeof (image) !== 'string' ? URL.createObjectURL(image) : image}
                                                        alt={`Product image`}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5QcmV2aWV3IEVycm9yPC90ZXh0Pjwvc3ZnPg==';
                                                        }}
                                                    />

                                                    {/* Action Buttons - Show on Hover */}
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                                        {/* Remove Button */}
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeImage();
                                                                    }}
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-white text-black p-2 text-xs z-50 rounded-md mb-0.5">
                                                                <p>Remove image</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>

                                                    {/* File Type Badge */}
                                                    {
                                                        typeof (image) !== 'string' && (
                                                            <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                                                                {image.name.split('.').pop()?.toUpperCase() || 'IMG'}
                                                            </div>
                                                        )
                                                    }

                                                    {/* File Size Badge - Now shows MB and compression info */}
                                                    {
                                                        typeof (image) !== 'string' && (
                                                            <div className="absolute bottom-1 left-10 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                                                                {formatFileSize(image.size)}
                                                            </div>
                                                        )
                                                    }
                                                    {wasCompressed && originalFileSize && (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <div className="absolute bottom-1 right-7 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded cursor-help">
                                                                    <span className="text-green-300">
                                                                        <Triangle className='size-4' />
                                                                    </span>
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-white text-black p-2 text-xs z-50 rounded-md">
                                                                <p>Original: {formatFileSize(originalFileSize)}</p>
                                                                <p>Saved: {compressionRatio}%</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}
                                                </div>
                                            </div>

                                            {originalFileSize && (
                                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                                    <p className="text-xs text-green-700 flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                        <span>
                                                            <strong>Image was compressed</strong> to reduce file sizes while maintaining quality.
                                                            Hover over the ↓ arrow to see original sizes.
                                                        </span>
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {/* <div className="flex justify-end items-center w-full">
                            {
                                image && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            updateImages(null);
                                            setOriginalFileSize(null);
                                        }}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        Remove All
                                    </Button>
                                )
                            }
                        </div> */}
                    </div>
                </CardContent>
            </Card>
        </TooltipProvider>
    )
}