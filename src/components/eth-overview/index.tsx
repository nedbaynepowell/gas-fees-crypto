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
      <p className="next-update">Next update in {props.nextUpdateInSeconds}s</p>
      <div className="date-container">
        <p className="data">
          {moment().format("ddd, D MMM YYYY HH:mm:ss")} UTC
        </p>
        <a href="https://twitter.com/intent/tweet?text=View%20the%20latest%20gas%20prices">
          <img src={twitterLogo} alt="twitter" />
        </a>
      </div>
      <div className="what-gwei tooltip">
        What is Gwei?
        <span className="tooltiptext">
          Gwei is short for gigawei and is equal to 0.000000001 ETH. The latest
          gas prices are recommended prices based on transaction speed and cost.
          Refreshes every 5 seconds.
        </span>
      </div>
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
