import useSWR from "swr";
import { ENDPOINT } from "./dashboard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Me = () => {
  const { data: receiveData, error } = useSWR(`${ENDPOINT}/api/me`, fetcher);
  return (
    <>
      <h1>me</h1>
    </>
  );
};

export default Me;
