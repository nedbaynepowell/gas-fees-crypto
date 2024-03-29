import { EthereumEcosystem } from "../../actions/fetchEthereumEcosystem";
import { intToPrice, twoDecimals } from "../../utils/number";
import "./style.scss";

interface Props {
  ethereumEcosystem: EthereumEcosystem[];
  loadTradingChart: (name: string) => void;
}

const Markets = (props: Props) => {
  const handleChartClick = (name: string) => {
    props.loadTradingChart(name);
  };

  return (
    <div className="markets">
      <h1>Market watch</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>Circulating Supply</th>
          </tr>
        </thead>
        <tbody>
          {props.ethereumEcosystem.map((item, index) => (
            <tr key={index} onClick={() => handleChartClick(item.name)}>
              <td>
                {item.name} <span>{item.symbol}</span>
              </td>
              <td>${twoDecimals(item.price)}</td>
              <td
                style={{
                  color:
                    item.percentChange24h > 0
                      ? "rgb(22, 199, 132)"
                      : "rgb(234, 57, 67)",
                }}
              >
                {twoDecimals(item.percentChange24h)}%
              </td>
              <td
                style={{
                  color:
                    item.percentChange7d > 0
                      ? "rgb(22, 199, 132)"
                      : "rgb(234, 57, 67)",
                }}
              >
                {twoDecimals(item.percentChange7d)}%
              </td>
              <td>${intToPrice(item.marketCap)}</td>
              <td>${intToPrice(item.volume)}</td>
              <td>
                {intToPrice(item.circulatingSupply)} {item.symbol}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Markets;
