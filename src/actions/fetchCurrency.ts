const fetchCurrency = async () => {
  const { data } = await fetch(
    "https://currencyapi.com/api/v2/latest?apikey=a36f3760-9424-11ec-8c67-ddb97e380620"
  ).then((r) => r.json());
  return data;
};
export default fetchCurrency;
