import cloudinary from "../../config/cloudinary.js";
import { StorageService } from "./StorageService.js";
import { UploadResult } from "./types.js";
import fs from "fs/promises";
import { Express } from "express";

export class CloudinaryProvider implements StorageService {
  async upload(file: Express.Multer.File): Promise<UploadResult> {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "finance-dp",
      resource_type: "auto",
    });
    await fs.unlink(file.path);

    return {
      storageKey: result.public_id,
      storageUrl: result.secure_url,
      provider: "cloudinary",
    };
  }

  async delete(storageKey: string): Promise<void> {
    await cloudinary.uploader.destroy(storageKey, {
      resource_type: "auto",
    });
  }

  getUrl(storageKey: string): string {
    return cloudinary.url(storageKey);
  }
}
