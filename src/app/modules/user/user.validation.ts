import { string, z } from "zod";

const createAdminSchemaValidation = z.object({
  password: z.string({ required_error: "password is required" }),
  admin: z.object({
    name: string({ required_error: "name is required" }),
    email: string({ required_error: "email is required" }),
    contactNumber: string({ required_error: "contactNumber is required" }),
  }),
});

export { createAdminSchemaValidation };
