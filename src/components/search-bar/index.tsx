import magnifyingGlassIcon from "../../assets/images/magnifying-glass.svg";
import "./style.scss";

interface Props {
  handleSearch(search: string): void;
}
const SearchBar = (props: Props) => {
  return (
    <div className="search-bar">
      <img src={magnifyingGlassIcon} alt="magnifying-glass" />
      <input
        type="text"
        placeholder="Search coins and NFT's on the Ethereum network"
        onChange={({ target }) => props.handleSearch(target.value)}
      />
    </div>
  );
};
export default SearchBar;
