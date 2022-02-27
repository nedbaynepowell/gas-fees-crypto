import { useEffect, useState } from "react";
import { Currency } from "../../App";
import "./style.scss";

interface Props {
  averagePrice: number;
  currency: Currency;
}

const GasSlider = (props: Props) => {
  const [currRecommendation, setCurrRecommendation] = useState("");
  const sliderValues = [];
  for (let i = 0; i <= 200; i += 25) {
    sliderValues.push(i);
  }
  useEffect(() => {
    if (props.averagePrice > 150) {
      setCurrRecommendation("Don't");
    } else if (props.averagePrice > 130 && props.averagePrice <= 150) {
      setCurrRecommendation("TOO EXPENSIVE");
    } else if (props.averagePrice > 130 && props.averagePrice <= 150) {
      setCurrRecommendation("AVERAGE");
    } else if (props.averagePrice <= 100) {
      setCurrRecommendation("GREAT TIME TO BUY");
    }
  }, [props.averagePrice]);

  return (
    <div className="gas-slider">
      <h1>Should I pay for gas fees now?</h1>
      <p className="gas-price">
        {props.averagePrice} GWEI - {currRecommendation}
      </p>
      <input
        className="slider"
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="200"
        value={props.averagePrice}
        readOnly
      />
      <label htmlFor="volume">
        {sliderValues.map((v) => (
          <span key={v}>{v}</span>
        ))}
      </label>
    </div>
  );
};
export default GasSlider;
