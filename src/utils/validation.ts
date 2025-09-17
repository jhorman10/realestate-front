/**
 * Validates if a string is a valid MongoDB ObjectId
 * ObjectId is a 24-character hexadecimal string
 */
export function isValidObjectId(id: string): boolean {
  // Check if the string is exactly 24 characters long
  if (id.length !== 24) {
    return false;
  }
  
  // Check if all characters are hexadecimal (0-9, a-f, A-F)
  const hexRegex = /^[0-9a-fA-F]{24}$/;
  return hexRegex.test(id);
}

/**
 * Error message for invalid ObjectId
 */
export const INVALID_OBJECTID_MESSAGE = "Must be a valid ObjectId (24-character hexadecimal string)";

/**
 * Zod custom validation function for ObjectId
 */
export function zodObjectIdValidation(value: string, ctx: any) {
  if (!isValidObjectId(value)) {
    ctx.addIssue({
      code: "custom",
      message: INVALID_OBJECTID_MESSAGE,
    });
  }
}
