import { Currency } from "../../App";
import GasPrice from "../gas-price";
import SearchBar from "../search-bar";
import logo from "../../assets/images/logo.svg";
import questionMark from "../../assets/images/question-logo.svg";
import "./style.scss";

interface Props {
  setCurrency(currency: Currency): void;
  ethPrice: {
    price: number;
    percent_change: number;
  };
  currency: Currency;
}

const Header = (props: Props) => {
  const handleSearch = () => {};
  return (
    <div className="header">
      <div className="inner-header">
        <div className="left-bar">
          <img className="logo" src={logo} alt="logo" />
          <p className="title">Gas fees crypto</p>
        </div>
        <div className="middle-bar">
          <SearchBar handleSearch={handleSearch} />
          <img className="question-logo" src={questionMark} alt="" />
        </div>
        <div className="right-bar">
          <GasPrice ethPrice={props.ethPrice} currency={props.currency} />
          <section className="select-wrapper">
            <select
              onChange={({ target }) =>
                props.setCurrency(target.value as Currency)
              }
            >
              <option value="USD">USD $</option>
              <option value="EUR">EUR $</option>
              <option value="GBP">GBP $</option>
              <option value="CNY">CNY $</option>
            </select>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Header;
