export interface EthereumEcosystem {
  name: string;
  symbol: string;
  price: string;
  percentChange24h: string;
  percentChange7d: string;
  marketCap: string;
  volume: string;
  circulatingSupply: string;
}
const fetchEthereumEcosystem = async (): Promise<EthereumEcosystem[]> => {
  const ecosystemJson = await fetch(
    "https://us-central1-gas-fees-crypto.cloudfunctions.net/webApi/api/v1/ethereumEcosystem"
  ).then((r) => r.json());
  return ecosystemJson;
};

export default fetchEthereumEcosystem;
