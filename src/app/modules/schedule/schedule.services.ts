import { Prisma, Schedule } from "@prisma/client";
import { addHours, addMinutes, format } from "date-fns";
import { JwtPayload } from "jsonwebtoken";
import { calculatePagination } from "../../../helpers/pagination.helpers";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interfaces/TPasination";
import { TFilterRequest, TSchedule } from "./schedule.interface";

const createScheduleIntoDB = async (
  payload: TSchedule
): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;
  const intervalTime = 30;
  const schedules = [];

  const currentDate = new Date(startDate); // start date
  const lastDate = new Date(endDate); // end date

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      // time & minute added
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      // time & minute added
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, intervalTime),
      };

      console.log({ startDateTime, endDateTime, scheduleData });

      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!existingSchedule) {
        // create into db
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + intervalTime);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getAllScheduleFromDB = async (
  filters: TFilterRequest,
  options: TPaginationOptions,
  user: JwtPayload
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(
    options as any
  );
  const { startDate, endDate, ...filterData } = filters;
  const andConditions: Prisma.ScheduleWhereInput[] = [];

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          startDateTime: {
            gte: startDate,
          },
        },
        {
          endDateTime: {
            lte: endDate,
          },
        },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const doctorSchedules = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
  });

  const doctorSchedulesIds = doctorSchedules.map(
    (schedule) => schedule.scheduleId
  );

  console.log({ doctorSchedulesIds });

  const result = await prisma.schedule.findMany({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorSchedulesIds,
      },
    },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },

    include: {
      doctorSchedules: true,
    },
  });

  const total = await prisma.schedule.count({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorSchedulesIds,
      },
    },
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export { createScheduleIntoDB, getAllScheduleFromDB };
