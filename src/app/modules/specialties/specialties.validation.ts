import { z } from "zod";

const createSpecialtiesSchemaValidation = z.object({
  title: z.string({ required_error: "title is required" }),
});

export { createSpecialtiesSchemaValidation };
