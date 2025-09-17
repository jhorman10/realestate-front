import { z } from "zod";
import { isValidObjectId, INVALID_OBJECTID_MESSAGE } from "../utils/validation";

// Custom ObjectId validation with Zod
const objectIdSchema = z.string().refine(
  (value) => isValidObjectId(value),
  {
    message: INVALID_OBJECTID_MESSAGE,
  }
);

// Owner schema
export const OwnerSchema = z.object({
  id: objectIdSchema,
  name: z.string(),
  address: z.string(),
  photo: z.string().url().optional(),
  birthday: z.string().datetime(),
});

// Property Image schema
export const PropertyImageSchema = z.object({
  id: objectIdSchema,
  file: z.string().url(),
  enabled: z.boolean(),
});

// Property Trace schema
export const PropertyTraceSchema = z.object({
  id: objectIdSchema,
  dateSale: z.string().datetime(),
  name: z.string(),
  value: z.number().positive(),
  tax: z.number().positive(),
});

// Base Property schema
export const PropertySchema = z.object({
  id: objectIdSchema,
  name: z.string()
    .min(1, "Name is required")
    .max(200, "Name cannot exceed 200 characters"),
  address: z.string()
    .min(1, "Address is required")
    .max(500, "Address cannot exceed 500 characters"),
  price: z.number()
    .positive("Price must be greater than 0"),
  codeInternal: z.string()
    .min(1, "Internal code is required")
    .max(50, "Internal code cannot exceed 50 characters"),
  year: z.number()
    .int("Year must be a whole number")
    .min(1800, "Year must be between 1800 and 2100")
    .max(2100, "Year must be between 1800 and 2100"),
  ownerId: objectIdSchema,
  enabled: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  owner: OwnerSchema.optional(),
  imageUrl: z.string().url().optional(),
  images: z.array(PropertyImageSchema).default([]),
});

// Property Detail schema (extends Property with traces)
export const PropertyDetailSchema = PropertySchema.extend({
  traces: z.array(PropertyTraceSchema).default([]),
});

// Create Property Request schema - Matches backend CreatePropertyRequest exactly
export const CreatePropertyRequestSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(200, "Name cannot exceed 200 characters"),
  address: z.string()
    .min(1, "Address is required")
    .max(500, "Address cannot exceed 500 characters"),
  price: z.number()
    .positive("Price must be greater than 0")
    .min(0.01, "Price must be at least 0.01"),
  codeInternal: z.string()
    .min(1, "Internal code is required")
    .max(50, "Internal code cannot exceed 50 characters"),
  year: z.number()
    .int("Year must be a whole number")
    .min(1800, "Year must be between 1800 and 2100")
    .max(2100, "Year must be between 1800 and 2100"),
  ownerId: objectIdSchema,
});

// Update Property Request schema - Matches backend UpdatePropertyRequest exactly
export const UpdatePropertyRequestSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(200, "Name cannot exceed 200 characters"),
  address: z.string()
    .min(1, "Address is required")
    .max(500, "Address cannot exceed 500 characters"),
  price: z.number()
    .positive("Price must be greater than 0")
    .min(0.01, "Price must be at least 0.01"),
  codeInternal: z.string()
    .min(1, "Internal code is required")
    .max(50, "Internal code cannot exceed 50 characters"),
  year: z.number()
    .int("Year must be a whole number")
    .min(1800, "Year must be between 1800 and 2100")
    .max(2100, "Year must be between 1800 and 2100"),
  ownerId: objectIdSchema,
  enabled: z.boolean().optional().default(true),
});

// Property Filter Request schema
export const PropertyFilterRequestSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  minPrice: z.number().min(0).optional(), // Add compatibility alias
  maxPrice: z.number().min(0).optional(), // Add compatibility alias
  ownerId: z.string().optional(), // Can be empty for filtering, so no ObjectId validation here
  year: z.number().min(1800).max(new Date().getFullYear() + 10).optional(),
  enabled: z.boolean().optional(),
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(100).optional(),
});

// API Response schemas
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.unknown(),
  errors: z.array(z.string()).default([]),
});

export const PagedResultSchema = z.object({
  items: z.array(z.unknown()),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

// Type exports
export type Owner = z.infer<typeof OwnerSchema>;
export type PropertyImage = z.infer<typeof PropertyImageSchema>;
export type PropertyTrace = z.infer<typeof PropertyTraceSchema>;
export type Property = z.infer<typeof PropertySchema>;
export type PropertyDetail = z.infer<typeof PropertyDetailSchema>;
export type CreatePropertyRequest = z.infer<typeof CreatePropertyRequestSchema>;
export type UpdatePropertyRequest = z.infer<typeof UpdatePropertyRequestSchema>;
export type PropertyFilterRequest = z.infer<typeof PropertyFilterRequestSchema>;
export type ApiResponse<T = unknown> = z.infer<typeof ApiResponseSchema> & { data: T };
export type PagedResult<T = unknown> = z.infer<typeof PagedResultSchema> & { items: T[] };

// Form validation helpers
export const validateCreateProperty = (data: unknown) => {
  return CreatePropertyRequestSchema.safeParse(data);
};

export const validateUpdateProperty = (data: unknown) => {
  return UpdatePropertyRequestSchema.safeParse(data);
};

export const validatePropertyFilter = (data: unknown) => {
  return PropertyFilterRequestSchema.safeParse(data);
};

// Export the objectIdSchema for reuse
export { objectIdSchema };
