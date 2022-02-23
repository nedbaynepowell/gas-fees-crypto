import { useEffect, useState } from "react";
import Header from "./components/header";
import GasPrice from "./components/gas-price";
import EthOverview from "./components/eth-overview";
import GasSlider from "./components/gas-slider";
import fetchPrices from "./actions/fetchGasPrices";
import fetchCurrency from "./actions/fetchCurrency";
import fetchEthPrice from "./actions/fetchEthPrice";
import fetchHistoricalGas from "./actions/fetchHistoricalGas";
import GasSelects from "./components/gas-selects";
import ChartHeatmap from "./components/chart-heatmap";
import ChartLine from "./components/chart-line";
import ReceiveNotification from "./components/receive-notification";
import { GWEItoETH } from "./utils//crypto-conversions";

import "./App.scss";
import MarketNews from "./components/market-news";

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

function App() {
  const [gasPrices, setGasPrices] = useState<GasPrices>({
    safelow: 0,
    fast: 0,
    average: 0,
  });
  const [averagePriceETH, setAveragePriceETH] = useState(0);
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
      setAveragePriceETH(GWEItoETH(gasRange.average / 10));
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
      <Header setCurrency={setCurrency} />
      <GasPrice
        ethPrice={{
          price: convertToCurrency(ETHPrice.price),
          percent_change: ETHPrice.percent_change,
        }}
        currency={currency}
      />
      <EthOverview
        gasPrices={gasPrices}
        nextUpdateInSeconds={nextUpdateInSeconds}
      />
      <GasSlider currency={currency} averagePrice={gasPrices.average} />
      <GasSelects
        currency={currency}
        averagePriceGWEI={gasPrices.average}
        averagePriceETH={convertToCurrency(averagePriceETH)}
      />
      <ChartHeatmap historicalGasData={historicalGasData} />
      <ChartLine historicalGasData={historicalGasData} />
      <ReceiveNotification />
      <MarketNews />
    </div>
  );
}

export default App;
