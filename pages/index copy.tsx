import CurrentTime from "../components/currentTime";
import RelaySwitch from "../components/switch";
import VoltGauge from "../components/voltGauge";

import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
import Relay from "../components/relay";

import useSWR from "swr";

const tmphost2Server = [
  {
    device: "DEVICE1",
    CommStatus: false,
    Voltage: 0,
    ConsumptionCurrent: 0,
    LeakageCurrent: 0.0,
    Temperature: 0,
    Humidity: 0,
    Alarm: 1,
    Relay: [true, false, true, false, false],
  },
  {
    device: "DEVICE2",
    CommStatus: false,
    Voltage: 0,
    ConsumptionCurrent: 0,
    LeakageCurrent: 0.0,
    Temperature: 0,
    Humidity: 0,
    Alarm: 0,
    Relay: [false, false, false, false, false],
  },
  {
    device: "DEVICE3",
    CommStatus: false,
    Voltage: 0,
    ConsumptionCurrent: 0,
    LeakageCurrent: 0.0,
    Temperature: 0,
    Humidity: 0,
    Alarm: 0,
    Relay: [false, false, false, false, false],
  },
  {
    device: "DEVICE4",
    CommStatus: false,
    Voltage: 0,
    ConsumptionCurrent: 0,
    LeakageCurrent: 0.0,
    Temperature: 0,
    Humidity: 0,
    Alarm: 0,
    Relay: [false, false, false, false, false],
  },
  {
    device: "DEVICE5",
    CommStatus: false,
    Voltage: 0,
    ConsumptionCurrent: 0,
    LeakageCurrent: 0.0,
    Temperature: 0,
    Humidity: 0,
    Alarm: 0,
    Relay: [false, false, false, false, false],
  },
];

type jsonDataProps = {
  device: string;
  CommStatus: boolean;
  Voltage: number;
  ConsumptionCurrent: number;
  LeakageCurrent: number;
  Temperature: number;
  Humidity: number;
  Alarm: number;
  Relay: boolean[];
};

// const ENDPOINT =
//   "http://ec2-15-164-245-6.ap-northeast-2.compute.amazonaws.com:4001";
const ENDPOINT = "http://localhost:4001";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const [response, setResponse] = useState("");
  const [hostJeonData, setHostJeonData] =
    useState<jsonDataProps[]>(tmphost2Server);
  // const { data, error } = useSWR(ENDPOINT, fetcher);
  const reloadDatas = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data: string) => {
      console.log(data);
      setResponse(data);
    });
    // console.log(relay, key);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      reloadDatas();
      // setResponse(new Date());
      // console.log(response);
    }, 500);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     // do something ...
  //     console.log("ttt");
  //     console.log(response);
  //     setResponse(response + 1);
  //     // reloadDatas();
  //     // console.log(data);
  //   }, 1000);
  //   // return () => clearTimeout(timerId);

  //   // const socket = socketIOClient(ENDPOINT);
  //   // socket.on("FromAPI", (data: string) => {
  //   //   console.log(data);
  //   //   setResponse(data);
  //   //   // setHostJeonData(parseData);
  //   // });
  // }, []);

  // console.log(device1);
  const alarmCheck = (alarm: number) => {
    let massage = "";
    switch (alarm) {
      case 0:
        massage = "알람이 없습니다";
        break;
      case 1:
        massage = "전압 문제발생";
        break;
      case 2:
        massage = "현재전류 문제발생";
        break;
      case 3:
        massage = "누설전류 문제발생";
        break;
      case 4:
        massage = "온도 문제발생";
        break;
      case 5:
        massage = "습도 문제발생";
        break;

      default:
        massage = "알람 신호 이상";
        break;
    }
    return massage;
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className=" text-2xl m-2">One Sound - Dashboard</h1>
      <CurrentTime />

      {hostJeonData.map((device, key) => (
        <div
          className="m-2 border-2 w-full grid grid-cols-2 border-slate-300 border-b-2"
          key={key}
        >
          {/* <div className="mx-4 my-2 col-span-2 ">
            <h1 className="text-3xl mb-2">{device.device}</h1>
          </div> */}
          <div className="mx-4 col-span-1 mt-2">
            <h1 className="text-2xl mb-2">{device.device}</h1>
            <h2 className="text-md mb-2">
              {" "}
              통신상태 : {device.CommStatus ? "에러" : "정상"}
            </h2>
            <h2 className="text-md mb-2"> 알람 : {alarmCheck(device.Alarm)}</h2>
          </div>

          <div className="mt-2">
            <VoltGauge id={`Voltage_${device.device}`} value={device.Voltage} />
          </div>
          <div className="">
            <VoltGauge
              id={`ConsumptionCurrent_${device.device}`}
              value={device.ConsumptionCurrent}
            />
          </div>
          <div className="">
            <VoltGauge
              id={`LeakageCurrent_${device.device}`}
              value={device.LeakageCurrent}
            />
          </div>
          <div className="">
            <VoltGauge
              id={`Temperature_${device.device}`}
              value={device.Temperature}
            />
          </div>
          <div className="">
            <VoltGauge
              id={`Humidity_${device.device}`}
              value={device.Humidity}
            />
          </div>
          <div className="col-span-2">
            <h1 className="text-2xl text-center p-2">Relay</h1>
            <div className="w-full flex">
              <Relay
                relays={device.Relay}
                ENDPOINT={ENDPOINT}
                device={device.device}
              />
            </div>
          </div>
        </div>
      ))}
      <div>{/* <p>{response}</p> */}</div>
    </div>
  );
};

export default Home;