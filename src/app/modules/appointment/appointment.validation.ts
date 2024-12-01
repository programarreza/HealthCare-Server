import { z } from "zod";

const createAppointmentValidationSchema = z.object({
  body: z.object({
    doctorId: z.string({
      required_error: "doctorId is required",
    }),

    scheduleId: z.string({
      required_error: "scheduleId is required",
    }),
  }),
});

export { createAppointmentValidationSchema };
