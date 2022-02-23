import EthLogo from "../../assets/images/eth-logo.svg";
import { Currency } from "../../App";
import "./style.scss";

interface Props {
  ethPrice: {
    price: number;
    percent_change: number;
  };
  currency: Currency;
}

const currencySymbol = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CNY: "¥",
};

const GasPrice = (props: Props) => {
  const percentIsNegative = props.ethPrice.percent_change < 0;

  return (
    <div className="gas-price">
      <div className="inner-gas-price">
        <img className="eth-logo" src={EthLogo} alt="eth-logo" />
        ETH price:
        <span className="price">
          {" "}
          {currencySymbol[props.currency]}
          {props.ethPrice.price.toFixed(2)}
        </span>
        <span className={`percent ${percentIsNegative ? "red" : "green"}`}>
          {(props.ethPrice.percent_change * 100).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};
export default GasPrice;
