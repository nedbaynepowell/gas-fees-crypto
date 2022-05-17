const fetchLineChartData = async () => {
  const lineChartData = await fetch(
    "https://us-central1-gas-fees-crypto.cloudfunctions.net/webApi/api/v1/lineChartData"
  ).then((r) => r.json());

  return lineChartData;
};
export default fetchLineChartData;
