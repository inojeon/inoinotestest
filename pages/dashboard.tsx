import CurrentTime from "../components/currentTime";
import VoltGauge from "../components/voltGauge";

import { useEffect, useState } from "react";

import useSWR from "swr";
import StatusLED from "../components/status";
import NewRelay from "../components/relay_v2";
import StatusLEDFire from "../components/statusFire";
import Image from "next/image";
import { LOCALSTORAGE_TOKEN } from ".";
import { useRouter } from "next/router";

const tmphost2Server = [
  {
    device: "DEVICE1",
    CommStatus: false,
    Voltage: 0,
    ConsumptionCurrent: 0,
    LeakageCurrent: 0.0,
    Temperature: 0,
    Humidity: 0,
    FireStatus: false,
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
    FireStatus: false,
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
    FireStatus: false,
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
    FireStatus: false,
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
    FireStatus: false,
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
  FireStatus: boolean;
  Relay: boolean[];
};

// export const ENDPOINT =
//   "http://ec2-15-164-245-6.ap-northeast-2.compute.amazonaws.com:4001";
// "http://localhost:4001";

const Dashboard = () => {
  const [token, setToken] = useState<string>("init");
  const route = useRouter();
  const fetcher = (url: string) =>
    fetch(url, {
      headers: { "x-jwt": token },
    }).then((res) => res.json());

  const [hostJeonData, setHostJeonData] =
    useState<jsonDataProps[]>(tmphost2Server);
  const { data: receiveData, error } = useSWR(`/api/monitoring`, fetcher, {
    refreshInterval: 500,
  });

  useEffect(() => {
    setToken(localStorage.getItem(LOCALSTORAGE_TOKEN) || "");

    return () => {};
  }, []);

  useEffect(() => {
    // console.log(receiveData);
    if (token === "init") {
      return;
    } else {
      if (receiveData) {
        if (receiveData.ok) {
          setHostJeonData(receiveData.datas);
        } else {
          if (receiveData.message === "LoginFailed") {
            route.push("/");
          } else if (receiveData.message === "JWTExpired") {
            localStorage.removeItem(LOCALSTORAGE_TOKEN);
            route.push("/");
          }
        }
      }
    }
    return () => {};
  }, [receiveData]);

  const clickLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    route.push("/");
  };
  return (
    <>
      {token === "init" ? (
        "Loading ... "
      ) : (
        <div className="flex flex-col items-center  text-white max-w-6xl mx-auto">
          <div className="md:m-2 w-full flex flex-col md:flex-row md:justify-end">
            <div className="md:flex-auto hidden md:flex md:justify-start md:items-center md:pl-4">
              <Image
                src="/logo.png"
                alt="Landscape picture"
                width={227}
                height={50}
              />
            </div>
            <h1 className=" text-2xl m-2 text-center">
              <span className="md:hidden">OneSoundTech - </span>OLoRa System
            </h1>
            <div className="flex-auto flex justify-center md:justify-end items-center md:pr-4">
              <CurrentTime />
            </div>
          </div>

          {hostJeonData
            ? hostJeonData.map((device, key) => (
                <div
                  className="m-2 border-2 w-full grid grid-cols-2 border-slate-300 border-b-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6"
                  key={key}
                >
                  {/* <div className="mx-4 my-2 col-span-2 ">
              <h1 className="text-3xl mb-2">{device.device}</h1>
            </div> */}
                  <div className="mx-4 col-span-1 mt-2 sm:row-span-2">
                    <h1 className="text-2xl mb-2">{device.device}</h1>

                    <div className="flex gap-x-2 items-center">
                      <h2 className="text-md"> ????????????</h2>
                      <StatusLED status={device.CommStatus} />
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <h2 className="text-md"> ????????????</h2>
                      <StatusLEDFire status={device.FireStatus} />
                    </div>
                  </div>

                  <div className="mt-2 ">
                    <VoltGauge
                      id={`Voltage_${device.device}`}
                      value={device.Voltage}
                    />
                  </div>
                  <div className="mt-2">
                    <VoltGauge
                      id={`ConsumptionCurrent_${device.device}`}
                      value={device.ConsumptionCurrent}
                    />
                  </div>
                  <div className="mt-2">
                    <VoltGauge
                      id={`LeakageCurrent_${device.device}`}
                      value={device.LeakageCurrent}
                    />
                  </div>
                  <div className="mt-2">
                    <VoltGauge
                      id={`Temperature_${device.device}`}
                      value={device.Temperature}
                    />
                  </div>
                  <div className="mt-2">
                    <VoltGauge
                      id={`Humidity_${device.device}`}
                      value={device.Humidity}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-4 mt-2 md:col-span-6 lg:col-span-6">
                    <div className="w-full flex">
                      <NewRelay relays={device.Relay} device={device.device} />
                    </div>
                  </div>
                </div>
              ))
            : null}
          <div>
            <button className="border p-2 m-2" onClick={clickLogout}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
