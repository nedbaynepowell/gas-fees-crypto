import { Currency } from "../../App";
import GasPrice from "../gas-price";
import SearchBar from "../search-bar";
import logo from "../../assets/images/logo.svg";
import { EthereumEcosystem } from "../../actions/fetchEthereumEcosystem";
import questionMark from "../../assets/images/question-logo.svg";
import "./style.scss";

interface Props {
  ethPrice: {
    price: number;
    percent_change: number;
  };
  currency: Currency;
  ethereumEcosystem: EthereumEcosystem[];
  setCurrency(currency: Currency): void;
  loadTradingChart: (name: string) => void;
}

const Header = (props: Props) => {
  return (
    <div className="header">
      <div className="inner-header">
        <div className="left-bar">
          <img className="logo" src={logo} alt="logo" />
          <p className="title">Ethereum Crypto Market</p>
        </div>
        <div className="middle-bar">
          <SearchBar
            loadTradingChart={props.loadTradingChart}
            ethereumEcosystem={props.ethereumEcosystem}
          />
          <div className="tooltip">
            <img className="question-logo" src={questionMark} alt="" />
            <p className="tooltiptext">
              Search for a coin to view its historical chart
            </p>
          </div>
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
