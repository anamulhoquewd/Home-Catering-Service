import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  try {
     await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted image: ${publicId}`);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

function extractPublicId(imageUrl: string): string {
  const parts = imageUrl.split("/");

  const lastPart = parts[parts.length - 1];

  const fileNameWithoutExtension = lastPart.split(".")[0];

  const folderPath = parts.slice(-3, -1).join("/");

  return `${folderPath}/${fileNameWithoutExtension}`;
}

async function deleteImagesFromCloudinary(imageUrls: string[]): Promise<void> {
  try {
    const publicIds = imageUrls.map((url) => extractPublicId(url)); // Extract public IDs from URLs

    for (const publicId of publicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image: ${publicId}`);
      } catch (error) {
        console.error(`Error deleting image ${publicId}:`, error);
      }
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}
export {
  extractPublicId,
  deleteImageFromCloudinary,
  deleteImagesFromCloudinary,
};
