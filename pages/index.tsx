import CurrentTime from "../components/currentTime";
import RelaySwitch from "../components/switch";
import VoltGauge from "../components/voltGauge";

import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
import Relay from "../components/relay";

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

const ENDPOINT =
  "http://ec2-15-164-245-6.ap-northeast-2.compute.amazonaws.com:4001";
// const ENDPOINT = "http://localhost:4001";

const device1 = {
  name: "Device1",
  sensors: [
    {
      id: "device1-sensor0",
      unit: "V",
      value: 10,
      title: "전압",
    },
    {
      id: "device1-sensor1",
      unit: "A",
      value: 12.3,
      title: "누선전류",
    },
    {
      id: "device1-sensor2",
      unit: "A",
      value: 4.2,
      title: "소비전류",
    },
    {
      id: "device1-sensor3",
      unit: "°C",
      value: 32,
      title: "온도",
    },
    {
      id: "device1-sensor4",
      unit: "%",
      value: 68,
      title: "습도",
    },
  ],
  relays: [false, true, false, false, false],
};

const Home = () => {
  const [response, setResponse] = useState("");
  const [hostJeonData, setHostJeonData] = useState(tmphost2Server);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
      setHostJeonData(JSON.parse(data));
    });
  }, []);

  console.log(device1);
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
      <div>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Home;
