import dayjs from "dayjs";

export const formatDateTime = (value) =>
  dayjs(value).format("MMM D, YYYY h:mm A");
