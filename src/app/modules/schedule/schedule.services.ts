import { addHours, format } from "date-fns";

const createScheduleIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  console.log({ currentDate, lastDate });

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addHours(
        `${format(currentDate, "yyyy-MM-dd")}`,
        Number(startTime.split(":")[0])
      )
    );

    const endDateTime = new Date(
      addHours(
        `${format(lastDate, "yyyy-MM-dd")}`,
        Number(endTime.split(":")[0])
      )
    );

    console.log({ startDateTime, endDateTime });

    while (startDateTime <= endDateTime) {
      // next module.
    }
  }
};

export { createScheduleIntoDB };
