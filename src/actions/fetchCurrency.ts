const fetchCurrency = async () => {
  const data = await fetch(
    "https://us-central1-gas-fees-crypto.cloudfunctions.net/webApi/api/v1/fetchCurrency"
  ).then((r) => r.json());
  return data;
};
export default fetchCurrency;
