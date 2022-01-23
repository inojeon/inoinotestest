import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";
type Prop = {
  id: string;
  value: number;
  unit: string;
  title: string;
};

type PropMinMax = {
  unit: string;
  min: number;
  max: number;
};

const minMax: PropMinMax[] = [
  {
    unit: "V",
    min: 90,
    max: 250,
  },
  {
    unit: "A",
    min: 0,
    max: 32,
  },
  {
    unit: "°C",
    min: -20,
    max: 100,
  },
  {
    unit: "%",
    min: 0,
    max: 100,
  },
];

const VoltGauge = ({ id, value, unit, title }: Prop) => {
  const { min, max } = minMax.find((element) => element.unit === unit);
  // console.log(current);
  const percent = (value - min) / (max - min);
  // const percent = 4;
  console.log("percent", percent, "value", value);
  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl">{title}</h1>
      <GaugeChart
        id={id}
        nrOfLevels={5}
        formatTextValue={(val) => val + " " + unit}
        percent={percent}
        viewValue={value}
      />
      {/* <ReactSpeedometer minValue={min} maxValue={max} value={value} /> */}
    </div>
  );
};

export default VoltGauge;
