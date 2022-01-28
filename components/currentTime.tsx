import type { NextPage } from "next";
import { useDate } from "./hooks/useDate";

const CurrentTime: NextPage = () => {
  const { year, date, time } = useDate();

  return (
    <div className="flex flex-col w-full items-center">
      <h1>{`${year} ${date} - ${time}`}</h1>
      {/* <h1>{`${time}`}</h1> */}
    </div>
  );
};

export default CurrentTime;
