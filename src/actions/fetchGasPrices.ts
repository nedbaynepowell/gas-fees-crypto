const fetchPrices = async () => {
  return fetch("https://ethgasstation.info/json/ethgasAPI.json").then((r) => r.json());
};

export default fetchPrices;
