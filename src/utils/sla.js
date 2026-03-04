import dayjs from "dayjs";
import { SLA_HOURS } from "./constants.js";

export const getSlaDeadline = (createdAt) =>
  dayjs(createdAt).add(SLA_HOURS, "hour");

export const getSlaCountdown = (createdAt) => {
  const deadline = getSlaDeadline(createdAt);
  const now = dayjs();
  const diff = deadline.diff(now, "second");
  if (diff <= 0) {
    return { label: "Overdue", isOverdue: true };
  }
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  return {
    label: `${hours}h ${minutes}m remaining`,
    isOverdue: hours < 6
  };
};
