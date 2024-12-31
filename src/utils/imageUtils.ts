import { PropertyImage } from '../types';

export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export function validateImage(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Le fichier doit être au format JPG ou PNG';
  }
  
  if (file.size > MAX_IMAGE_SIZE) {
    return 'L\'image ne doit pas dépasser 2Mo';
  }

  return null;
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function processImages(files: FileList): Promise<PropertyImage[]> {
  const images: PropertyImage[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const error = validateImage(file);
    
    if (error) {
      throw new Error(error);
    }

    const dataUrl = await readFileAsDataURL(file);
    images.push({
      url: dataUrl,
      isMain: i === 0 && images.length === 0, // First image is main only if there are no other images
    });
  }

  return images;
}

export async function processLogo(file: File): Promise<string> {
  const error = validateImage(file);
  if (error) {
    throw new Error(error);
  }

  return await readFileAsDataURL(file);
}