export interface EthereumEcosystem {
  name: string;
  symbol: string;
  price: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume: number;
  circulatingSupply: number;
}
const fetchEthereumEcosystem = async (): Promise<EthereumEcosystem[]> => {
  const ecosystemJson = await fetch(
    "https://us-central1-gas-fees-crypto.cloudfunctions.net/webApi/api/v1/ethereumEcosystem"
  ).then((r) => r.json());
  return ecosystemJson;
};

export default fetchEthereumEcosystem;
