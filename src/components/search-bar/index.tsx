import { useState } from "react";
import { EthereumEcosystem } from "../../actions/fetchEthereumEcosystem";
import magnifyingGlassIcon from "../../assets/images/magnifying-glass.svg";
import "./style.scss";

interface Props {
  ethereumEcosystem: EthereumEcosystem[];
  loadTradingChart(chart: string): void;
}
const SearchBar = (props: Props) => {
  const [search, setSearch] = useState("");
  const [filteredEthereumEcosystem, setFilteredEthereumEcosystem] = useState<
    EthereumEcosystem[]
  >([]);

  const handleClick = (name: string) => {
    setSearch("");
    setFilteredEthereumEcosystem([]);
    props.loadTradingChart(name);
  };

  const handleSearch = (str: string) => {
    setSearch(str);
    setFilteredEthereumEcosystem(
      props.ethereumEcosystem.filter((coin) =>
        coin.name.toLowerCase().includes(str.toLowerCase())
      )
    );
  };

  return (
    <div className="search-bar">
      <img src={magnifyingGlassIcon} alt="magnifying-glass" />
      <input
        type="text"
        placeholder="Search coins on the Ethereum network"
        // placeholder="Search coins and NFT's on the Ethereum network" // no NFT for now
        onChange={({ target }) => handleSearch(target.value)}
        value={search}
      />
      {filteredEthereumEcosystem.length ? (
        <div className="search-results">
          {filteredEthereumEcosystem.map((value, index) => (
            <button onClick={() => handleClick(value.name)} key={index}>
              {value.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default SearchBar;
