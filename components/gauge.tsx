import GaugeChart from "react-gauge-chart";

type Prop = {
  id: string;
  percent: number;
  unit: string;
  title: string;
};

const Gauge = ({ id, percent, unit, title }: Prop) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">{title}</h1>
      <GaugeChart
        id={id}
        nrOfLevels={5}
        formatTextValue={(value) => value + " " + unit}
        percent={percent}
      />
    </div>
  );
};

export default Gauge;
