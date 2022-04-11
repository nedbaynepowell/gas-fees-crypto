import "./style.scss";

interface Props {
  avgGasPrice: number;
  widths: {
    slow: number;
    standard: number;
    fast: number;
  };
}
const BarChart = (props: Props) => {
  return (
    <div className="bar-chart-container">
      {props.avgGasPrice > 150 && (
        <p className="suggestion red">
          It's a prohibitively expensive time to make a transaction.
        </p>
      )}
      {props.avgGasPrice > 130 && props.avgGasPrice <= 150 && (
        <p className="suggestion yellow">
          It's an expensive time to make a transaction.
        </p>
      )}
      {props.avgGasPrice > 130 && props.avgGasPrice <= 150 && (
        <p className="suggestion blue">
          It's an average time to make a transaction.
        </p>
      )}
      {props.avgGasPrice <= 100 && (
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
            <div className="slow" style={{ width: props.widths.slow }} />
            <div
              className="standard"
              style={{ width: props.widths.standard }}
            />
            <div className="fast" style={{ width: props.widths.fast }} />
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
