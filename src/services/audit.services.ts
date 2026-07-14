import prisma from "../config/prisma.js"

export const auditRepository={
    create:(data:any)=>{
        return prisma.auditLog.create({
            data
        })
    }
}

export const auditService={
    log:async(
        userId:string,
        action:string,
        entityType:string,
        entityId:string,
        oldValues?:any,
        newValues?:any)=>{

        return auditRepository.create({
            userId,
            action,
            entityType,
            entityId,
            oldValues,
            newValues
        })
    }
}