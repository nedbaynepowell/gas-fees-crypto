const fetchEthPrice = async (): Promise<{
  price: number;
  percent_change: number;
}> => {
  const {
    data: { market_data },
  } = await fetch(
    "https://data.messari.io/api/v1/assets/eth/metrics?fields=market_data/price_usd,market_data/percent_change_usd_last_24_hours"
  ).then((r) => r.json());
  console.log('market_data', market_data);
  return {
    price: market_data.price_usd,
    percent_change: market_data.percent_change_usd_last_24_hours,
  };
};

export default fetchEthPrice;
