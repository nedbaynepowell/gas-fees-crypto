import { Currency } from "../../App";
import "./style.scss";

interface Props {
  averagePriceGWEI: number;
  averagePriceETH: number;
  currency: Currency;
}
const GasSelects = (props: Props) => {
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
        value={`${props.averagePriceGWEI}                                                                 | ${props.currency}`}
      />
    </div>
  );
};

export default GasSelects;
