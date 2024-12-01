import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../shared/prisma";
import ApiError from "../../error/ApiError";

const createAppointmentIntoDB = async (user: JwtPayload, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
    },
  });

  const doctorScheduleData = await prisma.doctorSchedules.findMany({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
      appointmentId: null,
    },
  });

  if (!doctorScheduleData || doctorScheduleData.length === 0) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "No available schedules found for the selected doctor and schedule. Please select a different schedule or doctor."
    );
  }

  const videoCallingId: string = uuidv4();

  const result = await prisma.$transaction(async (transactionClient) => {
    // Step-1: create appointment
    const appointmentData = await transactionClient.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: payload.scheduleId,
        videoCallingId,
      },
      include: {
        patient: true,
        doctor: true,
        schedule: true,
      },
    });

    // Step-2: update isBooked field & set appointmentId from doctorSchedule table
    await transactionClient.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointmentData.id,
      },
    });

    // Step-3: create payment data
    const transactionId = `health-care-${uuidv4().slice(0, 6)}`;
    await transactionClient.payment.create({
      data: {
        appointmentId: appointmentData.id,
        amount: doctorData.appointmentFee,
        transactionId,
      },
    });

    return appointmentData;
  });

  return result;
};

export { createAppointmentIntoDB };
