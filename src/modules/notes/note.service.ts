import { AuditAction } from "../../generated/prisma/index.js";
import { ErrorHandler } from "../../middleware/errorHandler.js";
import { auditService } from "../../services/audit.services.js";
import { pagination } from "../../utils/pagination.js";
import { getNoteById } from "./note.controller.js";
import { noteRepository } from "./note.repository.js";
import { GetNoteQuery } from "./note.schema.js";
import { CreateNoteData, CreateNoteRequest, UpdateNoteData } from "./note.type.js";

export const noteService = {
  create: async (
    data: CreateNoteRequest,
    userId: string,
    ipAddress: string,
  ) => {
    const dataObj = {
      ...data,
      createdById: userId,
    };
    const result = await noteRepository.create(dataObj);
    await auditService.log(
      userId,
      AuditAction.CREATE,
      "NOTE",
      result.id,
      null,
      result,
      ipAddress,
    );
    return result;
  },

  getNotes:async(query:GetNoteQuery)=>{
    const {page,limit,skip}=pagination(query)
    const where: any = {
      deletedAt: null,
    }
    if(query.search){
    where.OR = [
       {
          title:{
              contains:query.search,
              mode:"insensitive"
          }
       },
       {
          description:{
              contains:query.search,
              mode:"insensitive"
          }
       }
    ]
}
if (query.is_pinned) {
    where.isPinned = query.is_pinned === "true";
}

if (query.is_archived) {
    where.isArchived = query.is_archived === "true";
}
    const result=await noteRepository.findMany(where,skip,limit)
    const total=await noteRepository.count(where)
    const totalPages=Math.ceil(total/limit)
    return{
        data:result,
        metadata: {
        page,
        limit,
        totalPages,
        total,
      },
    }
  },

  getNoteById:async(id:string)=>{
    const note=await noteRepository.findById(id)
    if(!note){
        throw new ErrorHandler(404,"No such note exists")
    }
    return note
  },
  updateNote:async(id:string,userId:string,data:UpdateNoteData,ipAddress:string)=>{
    const note=await noteRepository.findById(id)
    if(!note){
        throw new ErrorHandler(404,"No such note existss")
    }
    const dataObj={
        ...data,
        updatedById:userId
    }

    const result=await noteRepository.update(id,dataObj)
    await auditService.log(
        userId,
      AuditAction.UPDATE,
      "NOTE",
      result.id,
      note,
      result,
      ipAddress,
    )

    return result
  },
  deleteNote:async(id:string,userId:string,ipAddress:string)=>{
    const note=await noteRepository.findById(id)
    if (!note){
        throw new ErrorHandler(404,"No such note exists")
    } 
    

    const result=await noteRepository.softDelete(id,userId)

    await auditService.log(
        userId,
      AuditAction.DELETE,
      "NOTE",
      result.id,
      note,
      null,
      ipAddress,
    )

    return result
  },
  togglePinned: async (
    id: string,
    isPinned: boolean,
    userId: string,
    ipAddress: string
) => {

    const note = await noteRepository.findById(id);

    if (!note) {
        throw new ErrorHandler(404, "Note not found");
    }

    const updated = await noteRepository.togglePinned(
        id,
        isPinned
    );

    await auditService.log(
        userId,
        AuditAction.UPDATE,
        "NOTE",
        id,
        note,
        updated,
        ipAddress
    );

    return updated;
},
toggleArchived: async (
    id: string,
    isArchived: boolean,
    userId: string,
    ipAddress: string
) => {

    const note = await noteRepository.findById(id);

    if (!note) {
        throw new ErrorHandler(404, "Note not found");
    }

    const updated = await noteRepository.toggleArchived(
        id,
        isArchived
    );

    await auditService.log(
        userId,
        AuditAction.UPDATE,
        "NOTE",
        id,
        note,
        updated,
        ipAddress
    );

    return updated;
},
};
