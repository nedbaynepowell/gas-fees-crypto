import { Currency } from "../../App";
import "./style.scss";

interface Props {
  averagePriceGWEI: number;
  averagePriceETH: number;
  ethPrice: number;
  currency: Currency;
}
const GasSelects = (props: Props) => {
  const isMobile = window.innerWidth < 768;
  return (
    <div className="gas-selects">
      <select>
        <option>
          {props.averagePriceGWEI && props.averagePriceGWEI.toFixed(2)} | GWEI
        </option>
        <option>{props.averagePriceETH} | ETH</option>
      </select>
      <input
        disabled={true}
        className="avg-price"
        value={
          isMobile
            ? `${(props.ethPrice * props.averagePriceETH).toFixed(5)} ${
                props.currency
              }`
            : `${(props.ethPrice * props.averagePriceETH).toFixed(
                5
              )}                                                          | ${
                props.currency
              }`
        }
      />
    </div>
  );
};

export default GasSelects;
