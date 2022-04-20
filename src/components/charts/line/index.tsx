import { useEffect, useState } from "react";
import moment, { unitOfTime } from "moment";
import "./style.scss";

interface Props {
  historicalGasData: number[][];
}
const LineChart = (props: Props) => {
  const [points, setPoints] = useState("");
  const [timelength, setTimelength] = useState<unitOfTime.Diff>("week");
  const [gasPrice, setGasPrice] = useState("standard");

  useEffect(() => {
    buildPoints();
  }, [props.historicalGasData, timelength, gasPrice]);

  const buildPoints = () => {
    const newPointsRaw: { [x: number]: number[] } = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
    for (const data of props.historicalGasData) {
      const timeDiff = moment(data[0] * 1000).diff(moment(), timelength) * -1;
      const gasPrice = data[1];
      if (newPointsRaw.hasOwnProperty(timeDiff)) {
        newPointsRaw[timeDiff].push(gasPrice);
      }
    }
    let maxAvg = 0;
    const newPointsFormatted = Object.values(newPointsRaw).map(
      (values: number[], index: number) => {
        const sum = values.reduce((partialSum, a) => partialSum + a, 0);
        const avg = sum / values.length;
        if (avg > maxAvg) {
          maxAvg = avg;
        }
        return [index, avg || 0];
      }
    );
    const newPointsNormalized = newPointsFormatted.map((point: number[]) => {
      return [point[0] * 50, 150 - point[1] / (maxAvg / 150) || 0];
    });

    setPoints(newPointsNormalized.join("\n"));
  };
  return (
    <div className="line-chart-container">
      <div className="controller">
        <p>Gas price by: </p>
        <select
          defaultValue="week"
          onChange={(e) => setTimelength(e.target.value as unitOfTime.Diff)}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
        {/* <div className="vertical-line" />
        <select
          defaultValue="standard"
          onChange={(e) => setGasPrice(e.target.value)}
        >
          <option value="fast">Fast</option>
          <option value="standard">Standard</option>
          <option value="slow">Slow</option>
        </select> */}
      </div>
      <div className="line-chart">
        <div className="labels-y">
          <p>200</p>
          <p>150</p>
          <p>100</p>
          <p>50</p>
        </div>
        <svg width={300} height={305} viewBox="0 0 300 151" className="chart">
          <polyline
            fill="none"
            stroke="#0074d9"
            strokeWidth={3}
            points={points}
          />
        </svg>
        <div className="labels-x">
          <p>0</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
