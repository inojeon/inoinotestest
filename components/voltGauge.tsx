import GaugeChart from "react-gauge-chart";
type Prop = {
  id: string;
  value: number;
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
    unit: "ㅊ",
    min: -20,
    max: 100,
  },
  {
    unit: "%",
    min: 0,
    max: 100,
  },
];

const checkUnit = (id: string): { unit: string; title: string } => {
  const type = id.split("_")[0];
  if (type === "Voltage") {
    return { unit: "V", title: "전압" };
  } else if (type === "ConsumptionCurrent") {
    return { unit: "A", title: "현재전류" };
  } else if (type === "LeakageCurrent") {
    return { unit: "A", title: "누설전류" };
  } else if (type === "Temperature") {
    return { unit: "°C", title: "온도" };
  } else if (type === "Humidity") {
    return { unit: "%", title: "습도" };
  } else {
    return { unit: "%", title: "" };
  }
};

const VoltGauge = ({ id, value }: Prop) => {
  const { unit, title } = checkUnit(id);
  const tmpMinMax = minMax.find((element) => element.unit === unit);
  let min, max;
  if (tmpMinMax) {
    min = tmpMinMax.min;
    max = tmpMinMax.max;
  } else {
    min = 0;
    max = 100;
  }

  const viewValue = value > max ? max : value < min ? min : value;
  const percent = (viewValue - min) / (max - min);

  return (
    <div className="flex flex-col items-center mb-2">
      <h1 className="text-2xl">{title}</h1>
      <GaugeChart
        id={id}
        nrOfLevels={5}
        formatTextValue={(val) => val + " " + unit}
        percent={percent}
        viewValue={value}
        animate={false}
      />
    </div>
  );
};

export default VoltGauge;
