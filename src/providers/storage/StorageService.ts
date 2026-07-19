import { UploadResult } from "./types.js"
// import { Express } from "express"
import multer from "multer"

export interface StorageService {
    upload(
        file: Express.Multer.File
    ): Promise<UploadResult>

    delete(
        storageKey: string
    ): Promise<void>

    getUrl(
        storageKey: string
    ): string
}