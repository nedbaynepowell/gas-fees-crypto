import { GasPrices } from "../../../App";
import "./style.scss";

interface Props {
  gasPrices: GasPrices;
}
const BarChart = (props: Props) => {
  const { average, safelow, fast } = props.gasPrices;
  return (
    <div className="bar-chart-container">
      {average > 150 && (
        <p className="suggestion red">
          It's a prohibitively expensive time to make a transaction.
        </p>
      )}
      {average > 130 && average <= 150 && (
        <p className="suggestion yellow">
          It's an expensive time to make a transaction.
        </p>
      )}
      {average > 130 && average <= 150 && (
        <p className="suggestion blue">
          It's an average time to make a transaction.
        </p>
      )}
      {average <= 100 && (
        <p className="suggestion green">
          It's a great time to make a transaction!
        </p>
      )}
      <div className="bar-chart">
        <div className="labels-y">
          <p>Slow</p>
          <p>Standard</p>
          <p>Fast</p>
        </div>
        <div className="chart">
          <div className="bar-container">
            <div
              className="slow"
              style={{ width: `${(safelow / 200) * 100}%` }}
            />
            <div
              className="standard"
              style={{ width: `${(average / 200) * 100}%` }}
            />
            <div className="fast" style={{ width: `${(fast / 200) * 100}%` }} />
          </div>
          <div className="line-container">
            <div className="line">
              <p>0</p>
            </div>
            <div className="line">
              <p>50</p>
            </div>
            <div className="line">
              <p>100</p>
            </div>
            <div className="line">
              <p>150</p>
            </div>
            <div className="line">
              <p>200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
