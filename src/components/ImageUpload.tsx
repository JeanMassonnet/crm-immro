import React, { useRef } from 'react';
import { X, Upload, Star } from 'lucide-react';
import { PropertyImage } from '../types';
import { processImages, MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES } from '../utils/imageUtils';

type ImageUploadProps = {
  images: PropertyImage[];
  onChange: (images: PropertyImage[]) => void;
  onError: (error: string) => void;
};

export default function ImageUpload({ images, onChange, onError }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    try {
      const newImages = await processImages(e.target.files);
      onChange([...images, ...newImages]);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Une erreur est survenue');
    }

    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    // If we removed the main image, make the first remaining image the main one
    if (images[index].isMain && newImages.length > 0) {
      newImages[0].isMain = true;
    }
    onChange(newImages);
  };

  const handleSetMainImage = (index: number) => {
    const newImages = images.map((image, i) => ({
      ...image,
      isMain: i === index,
    }));
    onChange(newImages);
  };

  const formatFileSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)}Mo`;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden"
          >
            <img
              src={image.url}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {image.isMain && (
              <div className="absolute top-2 left-2 bg-yellow-400 text-white p-1 rounded-full">
                <Star className="w-4 h-4 fill-current" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button
                onClick={() => handleSetMainImage(index)}
                className={`px-2 py-1 rounded text-sm ${
                  image.isMain
                    ? 'bg-yellow-400 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                {image.isMain ? 'Photo principale' : 'Définir comme principale'}
              </button>
              <button
                onClick={() => handleRemoveImage(index)}
                className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center w-full">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-blue-500 border-dashed cursor-pointer hover:bg-blue-50">
          <Upload className="w-8 h-8 text-blue-500" />
          <span className="mt-2 text-base text-blue-500">Sélectionner des images</span>
          <span className="mt-1 text-sm text-gray-500">
            JPG/PNG jusqu'à {formatFileSize(MAX_IMAGE_SIZE)}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={ALLOWED_IMAGE_TYPES.join(',')}
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}