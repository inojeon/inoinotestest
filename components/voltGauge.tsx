import { useState } from "react";
import GaugeChart from "react-gauge-chart";
import useChangeWidthHeightSize from "./hooks/useChangeWidthHeightSize";
type Prop = {
  id: string;
  value: number;
};

type PropMinMax = {
  unit: string;
  min: number;
  max: number;
  alertMin: number;
  alertMax: number;
  arcsLength: number[];
  colors: string[];
};

/*
전압값 MAX: 230V
전압값 MIN: 190V
전류값 MAX: 16A (ConsumptionCurent)
온도 MAX: 70도씨
습도 MAX: 80%
*/

const minMax: PropMinMax[] = [
  {
    unit: "V",
    min: 90,
    max: 250,
    alertMin: 190,
    alertMax: 230,
    arcsLength: [0.625, 0.25, 0.125],
    colors: ["#EA4228", "#5BE12C", "#EA4228"],
  },
  {
    unit: "A",
    min: 0,
    max: 32,
    alertMin: 0,
    alertMax: 16,
    arcsLength: [0.5, 0.5],
    colors: ["#5BE12C", "#EA4228"],
  },
  {
    unit: "°C",
    min: -20,
    max: 100,
    alertMin: -20,
    alertMax: 70,
    arcsLength: [0.75, 0.25],
    colors: ["#5BE12C", "#EA4228"],
  },
  {
    unit: "%",
    min: 0,
    max: 100,
    alertMin: 0,
    alertMax: 80,
    arcsLength: [0.8, 0.2],
    colors: ["#5BE12C", "#EA4228"],
  },
];

const checkUnit = (id: string): { unit: string; title: string } => {
  const type = id.split("_")[0];
  if (type === "Voltage") {
    return { unit: "V", title: "전압" };
  } else if (type === "ConsumptionCurrent") {
    return { unit: "A", title: "소비전류" };
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
  const chartStyle = useChangeWidthHeightSize();

  const tmpMinMax = minMax.find((element) => element.unit === unit);
  let min, max, colors, arcsLength, alertMin, alertMax;
  if (tmpMinMax) {
    min = tmpMinMax.min;
    max = tmpMinMax.max;
    arcsLength = tmpMinMax.arcsLength;
    colors = tmpMinMax.colors;
    alertMin = tmpMinMax.alertMin;
    alertMax = tmpMinMax.alertMax;
  } else {
    min = 0;
    alertMin = 0;
    alertMax = 100;
    max = 100;
    arcsLength = [0.5, 0.5];
    colors = ["#5BE12C", "#EA4228"];
  }

  const viewValue = value > max ? max : value < min ? min : value;
  const percent = (viewValue - min) / (max - min);
  const isNotAlert = viewValue >= alertMin && viewValue <= alertMax;
  const textColor = isNotAlert ? "#FFFFFF" : "#EA4228";

  return (
    <div
      className={`flex flex-col items-center mb-2 justify-center  ${
        isNotAlert ? "" : "text-red-500 font-extrabold"
      }`}
    >
      <h1 className="text-lg mb-2">{title}</h1>
      <GaugeChart
        style={chartStyle}
        id={id}
        formatTextValue={(val) => val + " " + unit}
        percent={percent}
        viewValue={value}
        animate={false}
        arcsLength={arcsLength}
        colors={colors}
        textColor={textColor}
        // animDelay={500}
        // animateDuration={1000}
      />
    </div>
  );
};

export default VoltGauge;
