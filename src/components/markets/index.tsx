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
      <h1>Markets on the Ethereum Network</h1>
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
            <tr key={index}>
              <td>
                <button onClick={() => handleChartClick(item.name)}>
                  {item.name} <span>{item.symbol}</span>
                </button>
              </td>
              <td>${twoDecimals(parseFloat(item.price))}</td>
              <td
                style={{
                  color:
                    parseFloat(item.percentChange24h) > 0
                      ? "rgb(22, 199, 132)"
                      : "rgb(234, 57, 67)",
                }}
              >
                {twoDecimals(parseFloat(item.percentChange24h))}%
              </td>
              <td
                style={{
                  color:
                    parseFloat(item.percentChange7d) > 0
                      ? "rgb(22, 199, 132)"
                      : "rgb(234, 57, 67)",
                }}
              >
                {twoDecimals(parseFloat(item.percentChange7d))}%
              </td>
              <td>${intToPrice(parseFloat(item.marketCap))}</td>
              <td>${intToPrice(parseFloat(item.volume))}</td>
              <td>
                {intToPrice(parseFloat(item.circulatingSupply))} {item.symbol}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Markets;
