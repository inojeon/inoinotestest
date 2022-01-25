import GaugeChart from "react-gauge-chart";
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
  const tmpMinMax = minMax.find((element) => element.unit === unit);
  let min, max;
  if (tmpMinMax) {
    min = tmpMinMax.min;
    max = tmpMinMax.max;
  } else {
    min = 0;
    max = 100;
  }
  const percent = (value - min) / (max - min);
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
    </div>
  );
};

export default VoltGauge;
