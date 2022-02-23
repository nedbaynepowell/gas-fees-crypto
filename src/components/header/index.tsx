import { Currency } from '../../App';
import './style.scss';

interface Props {
  setCurrency(currency: Currency): void;
}

const Header = (props: Props) => {
  return (
    <div className="header">
      <div className="inner-header">
        <p>Crypto Gas Fees</p>
        <select onChange={({ target }) => props.setCurrency(target.value as Currency)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CNY">CNY</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
