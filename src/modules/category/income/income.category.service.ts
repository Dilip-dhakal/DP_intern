import { ErrorHandler } from "../../../middleware/errorHandler.js";
import { pagination } from "../../../utils/pagination.js";
import { incomeCategoryRepository } from "./income.category.repository.js";
import {
  CreateIncomeCategoryData,
  UpdateIncomeCategoryData,
} from "./income.category.types.js";
import { GetIncomeCategoryQuery } from "./income.category.schema.js";
import { Prisma } from "../../../generated/prisma/index.js";

export const incomeCategoryService = {
  create: async (data: CreateIncomeCategoryData) => {
    const existingCategory = await incomeCategoryRepository.findByName(
      data.name,
    );

    if (existingCategory) {
      throw new ErrorHandler(409, "Category already exists");
    }

    return incomeCategoryRepository.create(data);
  },

  getAll: async (query: GetIncomeCategoryQuery) => {
    const { page, limit, skip } = pagination(query);

    const where:Prisma.IncomeCategoryWhereInput  = {
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

  updateById: async (id: string, data: UpdateIncomeCategoryData) => {
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

    return incomeCategoryRepository.update(id, data);
  },

  deleteById: async (id: string, userId: string) => {
    const category = await incomeCategoryRepository.findById(id);

    if (!category) {
      throw new ErrorHandler(404, "Category not found");
    }

    return incomeCategoryRepository.softDelete(id, userId);
  },
};
