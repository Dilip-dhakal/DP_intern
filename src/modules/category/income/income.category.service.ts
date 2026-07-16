import { ErrorHandler } from "../../../middleware/errorHandler.js";
import { pagination } from "../../../utils/pagination.js";
import { incomeCategoryRepository } from "./income.category.repository.js";
import {
  CreateIncomeCategoryData,
  UpdateIncomeCategoryData,
} from "./income.category.types.js";
import { GetIncomeCategoryQuery } from "./income.category.schema.js";
import { AuditEntityType, Prisma } from "../../../generated/prisma/index.js";
import { auditService } from "../../../services/audit.services.js";

export const incomeCategoryService = {
  create: async (data: CreateIncomeCategoryData,userId:string,ipAddress:string) => {
    const existingCategory = await incomeCategoryRepository.findByName(
      data.name,
    );

    if (existingCategory) {
      throw new ErrorHandler(409, "Category already exists");
    }

    const result=await incomeCategoryRepository.create(data);
    
    return result
  },

  getAll: async (query: GetIncomeCategoryQuery) => {
    const { page, limit, skip } = pagination(query);

    const where: Prisma.IncomeCategoryWhereInput = {
      deletedAt: null,
    };

    if (query.search) {
      where["name"] = {
        contains: query.search,
        mode: "insensitive",
      };
    }

    const categories = await incomeCategoryRepository.findMany(
      where,
      skip,
      limit,
    );

    const total = await incomeCategoryRepository.count(where);

    return {
      data: categories,
      metadata: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getById: async (id: string) => {
    const category = await incomeCategoryRepository.findById(id);

    if (!category) {
      throw new ErrorHandler(404, "Category not found");
    }

    return category;
  },

  updateById: async (id: string, data: UpdateIncomeCategoryData,ipAddress:string,userId:string) => {
    const category = await incomeCategoryRepository.findById(id);

    if (!category) {
      throw new ErrorHandler(404, "Category not found");
    }

    if (data.name && data.name !== category.name) {
      const existingCategory = await incomeCategoryRepository.findByName(
        data.name,
      );

      if (existingCategory) {
        throw new ErrorHandler(409, "Category already exists");
      }
    }
    
    const result=await incomeCategoryRepository.update(id,data)
    auditService.log(
      userId,
      "UPDATE",
      AuditEntityType.INCOME,
      result.id,
      category,
      result,
      ipAddress
    )
    return result
  },

  deleteById: async (id: string, userId: string,ipAddress:string) => {
    const category = await incomeCategoryRepository.findById(id);

    if (!category) {
      throw new ErrorHandler(404, "Category not found");
    }

    return incomeCategoryRepository.softDelete(id, userId);
  },
};
