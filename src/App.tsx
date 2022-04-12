import { useEffect, useState } from "react";
import Header from "./components/header";
import EthOverview from "./components/eth-overview";
import fetchPrices from "./actions/fetchGasPrices";
import fetchCurrency from "./actions/fetchCurrency";
import fetchEthPrice from "./actions/fetchEthPrice";
import fetchHistoricalGas from "./actions/fetchHistoricalGas";
import ReceiveNotification from "./components/receive-notification";
import BuySell from "./components/buy-sell";
import Markets from "./components/markets";

import "./App.scss";
import CryptoNews from "./components/market-news";
import BarChart from "./components/charts/bar";
import LineChart from "./components/charts/line";
import Sidebar from "./components/sidebar";

export type Currency = "USD" | "EUR" | "GBP" | "CNY";
interface CurrencyConversion {
  EUR: number;
  GBP: number;
  CNY: number;
}
export interface GasPrices {
  safelow: number;
  fast: number;
  average: number;
}

export type Page = "gas-prices" | "markets" | "news" | "buy-sell";
function App() {
  const [gasPrices, setGasPrices] = useState<GasPrices>({
    safelow: 0,
    fast: 0,
    average: 0,
  });
  const [page, setPage] = useState<Page>("gas-prices");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [nextUpdateInSeconds, setNextUpdateInSeconds] = useState(0);
  const [ETHPrice, setETHPrice] = useState({ price: 0, percent_change: 0 });
  const [historicalGasData, setHistoricalGasData] = useState<number[][]>([]);
  const [currencyConversions, setCurrencyConversions] =
    useState<CurrencyConversion | null>(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const [currenciesRes, ethPriceRes, historicalGasRes] = await Promise.all([
        fetchCurrency(),
        fetchEthPrice(),
        fetchHistoricalGas(),
      ]);
      setETHPrice(ethPriceRes);
      setCurrencyConversions({
        EUR: currenciesRes.EUR,
        GBP: currenciesRes.GBP,
        CNY: currenciesRes.CNY,
      });
      setHistoricalGasData(historicalGasRes);
    };
    asyncEffect();
  }, []);

  useEffect(() => {
    const asyncEffect = async () => {
      const gasRange = await fetchPrices();
      setGasPrices({
        safelow: gasRange.safeLow / 10,
        fast: gasRange.fast / 10,
        average: gasRange.average / 10,
      });
      // setAveragePriceETH(GWEItoETH(gasRange.average / 10));
    };
    if (nextUpdateInSeconds === 0) {
      asyncEffect();
    }
    const intervalId = setInterval(() => {
      setNextUpdateInSeconds((s) => (s === 0 ? 15 : s - 1));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [nextUpdateInSeconds]);
  const convertToCurrency = (value: number) => {
    if (currency === "USD") {
      return value;
    } else if (currencyConversions) {
      return currencyConversions[currency] * value;
    }
    return 0;
  };

  return (
    <div className="main-app">
      <Header
        setCurrency={setCurrency}
        ethPrice={{
          price: convertToCurrency(ETHPrice.price),
          percent_change: ETHPrice.percent_change,
        }}
        currency={currency}
      />
      <Sidebar changePage={(p) => setPage(p)} page={page} />
      {page === "gas-prices" && (
        <>
          <EthOverview
            gasPrices={gasPrices}
            nextUpdateInSeconds={nextUpdateInSeconds}
          />
          <div className="charts">
            <BarChart
              avgGasPrice={gasPrices.average}
              widths={{
                slow: 125,
                standard: 140,
                fast: 155,
              }}
            />
            <LineChart historicalGasData={historicalGasData} />
          </div>
          <ReceiveNotification />
        </>
      )}
      {page === "markets" && <Markets />}
      {page === "buy-sell" && <BuySell />}
      {page === "news" && <CryptoNews />}
    </div>
  );
}

export default App;
