import { Request, Response } from "express";

import {
  createIncomeCategorySchema,
  getIncomeCategoryQuerySchema,
  incomeCategoryIdSchema,
  updateIncomeCategorySchema,
} from "./income.category.schema.js";

import { incomeCategoryService } from "./income.category.service.js";
import { sendResponse } from "../../../shared/response.js";

export const createIncomeCategory = async (req: Request, res: Response) => {
  const body = createIncomeCategorySchema.parse(req.body);
  const ipAddress=req.headers["x-forwarded-for"]||req.ip
  const userId=req.user?.id
  const result = await incomeCategoryService.create(body,ipAddress as string,userId as string);

  return sendResponse(res, 201, "Category created successfully", result);
};

export const getIncomeCategories = async (req: Request, res: Response) => {
  const query = getIncomeCategoryQuerySchema.parse(req.query);
  const result = await incomeCategoryService.getAll(query);

  return sendResponse(res, 200, "Categories fetched successfully", result.data, result.metadata);
};

export const getIncomeCategoryById = async (req: Request, res: Response) => {
  const { id } = incomeCategoryIdSchema.parse(req.params);

  const result = await incomeCategoryService.getById(id);

  return sendResponse(res, 200, "Category fetched successfully", result);
};

export const updateIncomeCategoryById = async (req: Request, res: Response) => {
  const { id } = incomeCategoryIdSchema.parse(req.params);
  const ipAddress=req.headers["x-forwarded-for"]||req.ip
  const userId=req.user?.id
  const body = updateIncomeCategorySchema.parse(req.body);

  const result = await incomeCategoryService.updateById(id, body,ipAddress as string,userId as string);

  return sendResponse(res, 200, "Category updated successfully", result);
};

export const deleteIncomeCategoryById = async (req: Request, res: Response) => {
  const { id } = incomeCategoryIdSchema.parse(req.params);

  const userId = req.user?.id as string;
  const ipAddress=req.headers["x-forwaded-for"]||req.ip
  await incomeCategoryService.deleteById(id, userId,ipAddress as string);

  return sendResponse(res, 200, "Category deleted successfully");
};
