import { title } from "process";
import CurrentTime from "../components/currentTime";
import Gauge from "../components/gauge";
import RelaySwitch from "../components/switch";
import VoltGauge from "../components/voltGauge";

const device1 = {
  name: "Device1",
  sensors: [
    {
      id: "device1-sensor0",
      unit: "V",
      value: 120,
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
  console.log(device1);
  return (
    <div className="flex flex-col items-center text-white">
      <h1 className=" text-2xl m-2">One Sound - Dashboard</h1>
      <CurrentTime />
      <div className="m-2 p-4 border-2 w-full">
        <h1 className="text-3xl mb-2">{device1.name}</h1>
        <span>정상</span>

        <div className="grid grid-cols-2">
          {device1.sensors.map((sensor) => (
            <div className="" key={sensor.id}>
              <VoltGauge
                id={sensor.id}
                unit={sensor.unit}
                value={sensor.value}
                title={sensor.title}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 text-center">
          {device1.relays.map((relay, key) => (
            <div key={key}>
              <RelaySwitch title={key.toString()} value={relay} />
            </div>
            // <span key={key}>aa</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
