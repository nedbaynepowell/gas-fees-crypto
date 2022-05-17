import moment from "moment";
import twitterLogo from "../../assets/images/twitter-logo.svg";
import { GasPrices } from "../../App";
import "./style.scss";

interface Props {
  gasPrices: GasPrices;
  nextUpdateInSeconds: number;
}

const EthOverview = (props: Props) => {
  return (
    <div className="eth-overview">
      <h1>Ethereum Gas Prices</h1>
      <div className="eth-price-container">
        <div className="eth-price">
          <div className="title">
            FAST <span>{"<"} 30 sec</span>
          </div>
          <div className="value">
            <span className="value">{props.gasPrices.fast}</span>Gwei
          </div>
        </div>
        <div className="eth-price">
          <div className="title">
            STANDARD <span>{"<"} 5 min</span>
          </div>
          <div className="value">
            <span className="value">{props.gasPrices.average}</span>Gwei
          </div>
        </div>
        <div className="eth-price">
          <div className="title">
            SLOW <span>{"<"} 30 min</span>
          </div>
          <div className="value">
            <span className="value">{props.gasPrices.safelow}</span>Gwei
          </div>
        </div>
      </div>
    </div>
  );
};
export default EthOverview;
