import { z } from "zod";

export const optionalNonEmptyString = z
  .string()
  .trim()
  .transform((val) => (val === "" ? undefined : val))
  .optional();
