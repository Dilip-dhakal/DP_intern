export type CreateExpenseData={
    transactionDate:Date,
    amount:number,
    vendorName?:string,
    expenseCategoryId:string,
    paymentMethod:
        | "CASH"
        | "BANK_TRANSFER"
        | "CHEQUE"
        | "ESEWA"
        | "KHALTI"
        | "OTHER",
    referenceNumber?:string,
    invoiceNumber?:string,
    description?:string,
    createdById:string
}

export type UpdateExpenseData={
    transactionDate?:Date,
    amount?:number,
    vendorName?:string,
    expenseCategoryId:string,
    paymentMethod:
        | "CASH"
        | "BANK_TRANSFER"
        | "CHEQUE"
        | "ESEWA"
        | "KHALTI"
        | "OTHER",
    referenceNumber?:string,
    invoiceNumber?:string,
    description?:string,
    updatedById?:string
}

export type CreateExpenseRequest =
    Omit<CreateExpenseData, "createdById">;

export type UpdateExpenseRequest =
    Omit<UpdateExpenseData, "updatedById">;