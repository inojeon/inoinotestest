import { useEffect, useState } from "react";

export const useDate = () => {
  const locale = "kr";
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

  useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const year = `${today.toLocaleDateString(locale, {
    year: "numeric",
  })}`;
  const date = `${today.toLocaleDateString(locale, {
    month: "long",
  })} ${today.getDate()}일  ${day}`;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    second: "numeric",
  });

  return {
    year,
    date,
    time,
  };
};
