export type CreateAttachmentData = {
  entityType: "INCOME" | "EXPENSE" | "REMINDER";

  entityId: string;

  fileName: string;

  fileSize: number;

  mimeType: string;

  storageKey: string;

  storageUrl: string;

  provider: string;

  uploadedById: string;
};
