import { DateTime } from "luxon";

const getFormattedDate = (date) => {
  const dt = DateTime.fromISO(date);
  const dayOfMonth = dt.toFormat("d MMM");
  const dayOfWeek = dt.toFormat("EEEE");
  const time = dt.toFormat("hh:mm a");
  const relativeDate = dt.toRelativeCalendar();
  return { time, dayOfWeek, dayOfMonth, relativeDate };
};

const isMissedDate = (date) => {
  const dt = DateTime.fromISO(date);
  return dt.diffNow() < 0;
};

export { getFormattedDate, isMissedDate };
