const fetchHistoricalGas = async () => {
  const historicalData = await fetch(
    "https://us-central1-gas-fees-crypto.cloudfunctions.net/webApi/api/v1/historicalData"
  ).then((r) => r.json());

  return historicalData;
};
export default fetchHistoricalGas;
