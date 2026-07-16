import { Request, Response } from "express";

import {
  createIncomeCategorySchema,
  getIncomeCategoryQuerySchema,
  incomeCategoryIdSchema,
  updateIncomeCategorySchema,
} from "./income.category.schema.js";

import { incomeCategoryService } from "./income.category.service.js";

export const createIncomeCategory = async (req: Request, res: Response) => {
  const body = createIncomeCategorySchema.parse(req.body);
  const ipAddress=req.headers["x-forwarded-for"]||req.ip
  const userId=req.user?.id
  const result = await incomeCategoryService.create(body,ipAddress as string,userId as string);

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: result,
  });
};

export const getIncomeCategories = async (req: Request, res: Response) => {
  const query = getIncomeCategoryQuerySchema.parse(req.query);
  const result = await incomeCategoryService.getAll(query);

  return res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
};

export const getIncomeCategoryById = async (req: Request, res: Response) => {
  const { id } = incomeCategoryIdSchema.parse(req.params);

  const result = await incomeCategoryService.getById(id);

  return res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    data: result,
  });
};

export const updateIncomeCategoryById = async (req: Request, res: Response) => {
  const { id } = incomeCategoryIdSchema.parse(req.params);
  const ipAddress=req.headers["x-forwarded-for"]||req.ip
  const userId=req.user?.id
  const body = updateIncomeCategorySchema.parse(req.body);

  const result = await incomeCategoryService.updateById(id, body,ipAddress as string,userId as string);

  return res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: result,
  });
};

export const deleteIncomeCategoryById = async (req: Request, res: Response) => {
  const { id } = incomeCategoryIdSchema.parse(req.params);

  const userId = req.user?.id as string;
  const ipAddress=req.headers["x-forwaded-for"]||req.ip
  await incomeCategoryService.deleteById(id, userId,ipAddress as string);

  return res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
};
