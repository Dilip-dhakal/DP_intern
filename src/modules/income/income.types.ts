export type CreateIncomeData = {
    transactionDate: Date;
    amount: number;
    incomeCategoryId: string;
    incomeSource?: string;
    clientName?: string;
    paymentMethod:
        | "CASH"
        | "BANK_TRANSFER"
        | "CHEQUE"
        | "ESEWA"
        | "KHALTI"
        | "OTHER";
    referenceNumber?: string;
    invoiceNumber?: string;
    description?: string;
    createdById: string;
};

export type UpdateIncomeData = {
    transactionDate?: Date;
    amount?: number;
    incomeCategoryId?: string;
    incomeSource?: string;
    clientName?: string;
    paymentMethod?:
        | "CASH"
        | "BANK_TRANSFER"
        | "CHEQUE"
        | "ESEWA"
        | "KHALTI"
        | "OTHER";
    referenceNumber?: string;
    invoiceNumber?: string;
    description?: string;
    updatedById?: string;
};

export type CreateIncomeRequest =
    Omit<CreateIncomeData, "createdById">;