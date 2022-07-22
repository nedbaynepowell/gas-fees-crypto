import Nexo from "../../assets/images/nexo.png";
import Coinbase from "../../assets/images/coinbase.png";
import Cryptocom from "../../assets/images/cryptocom.png";
import "./style.scss";

const BuySell = () => {
  const open = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <div className="buy-sell">
      <h1>Buy/Sell Cryptocurrency</h1>
      <h3>Select an exchange below:</h3>
      <div className="exchanges">
        <button
          onClick={() => open("https://www.coinbase.com/join/baynep_v")}
          className="exchange"
        >
          <img src={Coinbase} alt="coinbase" />
          <h3>Coinbase</h3>
          <p>
            Has an easy to use interface that allows you to buy, sell and
            exchange cryptocurrencies easily. Lower fees are available with
            Coinbase Pro.
          </p>
        </button>
        <button
          onClick={() => open("https://nexo.io/ref/wgakrobcat?src=ios-link")}
          className="exchange"
        >
          <img src={Nexo} alt="nexo" />
          <h3>Nexo</h3>
          <p>
            Allows crypto lending and allows users to access crypto-backed loans
            instantly. Nexo supports 28 cryptocurrencies to buy, sell and earn
            crypto.
          </p>
        </button>
        <button
          onClick={() => open("https://crypto.com/app/vyhne5xext")}
          className="exchange"
        >
          <img src={Cryptocom} alt="crypto.com" />
          <h3>Crypto.com</h3>
          <p>
            Has an extensive list of supported cryptocurrencies where you can
            earn rewards through holding their coin CRO and access their
            crypto.com rewards visa.
          </p>
        </button>
      </div>
    </div>
  );
};

export default BuySell;
