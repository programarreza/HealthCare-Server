import { Gender, UserStatus } from "@prisma/client";
import { string, z } from "zod";

const createAdminSchemaValidation = z.object({
  password: z.string({ required_error: "password is required" }),
  admin: z.object({
    name: string({ required_error: "name is required" }),
    email: string({ required_error: "email is required" }),
    contactNumber: string({ required_error: "contactNumber is required" }),
  }),
});

const createDoctorSchemaValidation = z.object({
  password: z.string({ required_error: "password is required" }),
  doctor: z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
    address: z.string().optional(),
    registrationNumber: z.string({
      required_error: "registrationNumber is required",
    }),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number({ required_error: "appointment fee is required" }),
    qualification: z.string({
      required_error: "qualification is required",
    }),
    currentWorkingPlace: z.string({
      required_error: "currentWorkingPlace is required",
    }),
    designation: z.string({
      required_error: "designation is required",
    }),
    averageRating: z.number().default(0).optional(),
  }),
});

// const changeUserStatusSchemaValidation = z.object({
//   // body: z.object({
//     status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
//   // }),
// });

const createPatientSchemaValidation = z.object({
  password: z.string({ required_error: "password is required" }),
  patient: z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }),
    contactNumber: z.string({ required_error: "contactNumber is required" }),
    address: z.string().optional(),
  }),
});

export {
  // changeUserStatusSchemaValidation,
  createAdminSchemaValidation,
  createDoctorSchemaValidation,
  createPatientSchemaValidation,
};
