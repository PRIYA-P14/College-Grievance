import { useEffect, useState } from "react";
import { getSlaCountdown } from "../utils/sla.js";

export default function SlaTimer({ createdAt }) {
  const [countdown, setCountdown] = useState(() => getSlaCountdown(createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getSlaCountdown(createdAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <span className={`sla ${countdown.isOverdue ? "danger" : ""}`}>
      {countdown.label}
    </span>
  );
}
