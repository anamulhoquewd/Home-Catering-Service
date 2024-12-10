import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const fileUploader = async (c: any) => {
  const form = await c.req.formData(); // FormData
  const files = form.getAll("file"); // 'file'

  if (files.length === 0) {
    return c.json({ message: "No files uploaded" }, 400);
  }

  const uploadPromises = files.map(async (file) => {
    if (!(file instanceof File)) {
      throw new Error("Invalid file type");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "home-catering-service" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer); // Buffer
    });
  });

  try {
    const uploadResults = await Promise.all(uploadPromises);

    // Return the URLs of the uploaded files
    const fileUrls = uploadResults.map((result) => result.secure_url);

    return c.json({
      message: "Files uploaded successfully",
      fileUrls,
    });
  } catch (error) {
    return c.json({ message: "File upload failed", error: error.message }, 500);
  }
};

export default fileUploader;
