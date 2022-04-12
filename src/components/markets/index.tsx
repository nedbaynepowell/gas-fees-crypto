import { useEffect, useState } from "react";
import fetchEthereumEcosystem, {
  EthereumEcosystem,
} from "../../actions/fetchEthereumEcosystem";
import { intToPrice } from "../../utils/number";
import "./style.scss";

const Markets = () => {
  const [data, setData] = useState<EthereumEcosystem[]>([]);
  useEffect(() => {
    const asyncEffect = async () => {
      const res = await fetchEthereumEcosystem();
      setData(res);
    };
    asyncEffect();
  });
  console.log("data[0]", data[0]);
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
          {data.map((item) => (
            <tr>
              <td>
                {item.name} <span>{item.symbol}</span>
              </td>
              <td>${parseInt(item.price).toFixed(2)}</td>
              <td>{parseInt(item.percentChange24h).toFixed(2)}%</td>
              <td>{parseInt(item.percentChange7d).toFixed(2)}%</td>
              <td>${intToPrice(parseInt(item.marketCap))}</td>
              <td>${intToPrice(parseInt(item.volume))}</td>
              <td>{intToPrice(parseInt(item.circulatingSupply))} {item.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Markets;
