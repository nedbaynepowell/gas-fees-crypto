import { Page } from "../../App";
import gasIcon from "../../assets/images/gas-icon.svg";
import blueGasIcon from "../../assets/images/blue-gas-icon.svg";
import moneyIcon from "../../assets/images/money-icon.svg";
import blueMoneyIcon from "../../assets/images/blue-money-icon.svg";
import formIcon from "../../assets/images/form-icon.svg";
import blueFormIcon from "../../assets/images/blue-form-icon.svg";
import suitcaseIcon from "../../assets/images/suitcase-icon.svg";
import blueSuitcaseIcon from "../../assets/images/blue-suitcase-icon.svg";
import "./style.scss";

interface Props {
  page: Page;
  changePage(page: Page): void;
}

const Sidebar = (props: Props) => {
  const enabled = (type: Page) => props.page === type;
  return (
    <div className="sidebar">
      <button
        disabled={enabled("gas-prices")}
        onClick={() => props.changePage("gas-prices")}
      >
        {enabled("gas-prices") ? (
          <img className="active" src={blueGasIcon} alt="suitcase-icon" />
        ) : (
          <img src={gasIcon} alt="suitcase-icon" />
        )}
        <span>Ethereum Gas Prices</span>
      </button>
      <button
        disabled={enabled("markets")}
        onClick={() => props.changePage("markets")}
      >
        {enabled("markets") ? (
          <img className="active" src={blueMoneyIcon} alt="suitcase-icon" />
        ) : (
          <img src={moneyIcon} alt="suitcase-icon" />
        )}
        <span>Markets</span>
      </button>
      <button
        disabled={enabled("news")}
        onClick={() => props.changePage("news")}
      >
        {enabled("news") ? (
          <img className="active" src={blueFormIcon} alt="suitcase-icon" />
        ) : (
          <img src={formIcon} alt="suitcase-icon" />
        )}
        <span>News</span>
      </button>
      <button
        disabled={enabled("buy-sell")}
        onClick={() => props.changePage("buy-sell")}
      >
        {enabled("buy-sell") ? (
          <img className="active" src={blueSuitcaseIcon} alt="suitcase-icon" />
        ) : (
          <img src={suitcaseIcon} alt="suitcase-icon" />
        )}
        <span>Buy/Sell</span>
      </button>
    </div>
  );
};

export default Sidebar;
