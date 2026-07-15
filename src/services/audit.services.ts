import prisma from "../config/prisma.js"
import { AuditAction,AuditEntityType } from "../generated/prisma/index.js"

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
        action:AuditAction,
        entityType:AuditEntityType,
        entityId:string,
        oldValues?:any,
        newValues?:any,
        ipAddress?:string)=>{

        return auditRepository.create({
            userId,
            action,
            entityType,
            entityId,
            oldValues,
            newValues,
            ipAddress
        })
    }
}