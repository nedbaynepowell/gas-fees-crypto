import { useEffect } from "react";
import moment from "moment";
import Highcharts from "highcharts";
import "./style.scss";

require("highcharts/modules/exporting")(Highcharts);

interface Props {
  historicalGasData: any;
}

const ChartLine = (props: Props) => {
  useEffect(() => {
    const asyncEffect = async () => {
      const data = props.historicalGasData.map((d: any) => d[1]);
      const xAxiesCategories: string[] = [];
      let currDay = moment(props.historicalGasData[0][0]).format("Do");
      let skipEveryTwo = 0;
      for (const d of props.historicalGasData) {
        const currHour = moment(d[0]).format("HH");
        if (moment(d[0]).format("Do") !== currDay) {
          currDay = moment(d[0]).format("Do");
          xAxiesCategories.push(`${currDay} ${currHour}`);
        } else {
          if (skipEveryTwo === 50) {
            xAxiesCategories.push(currHour);
            skipEveryTwo = 0;
          } else {
            skipEveryTwo++;
          }
        }
      }
      (Highcharts as any).chart("line-container", {
        chart: {
          type: "line",
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1,
        },
        title: {
          text: "What is Gas Price by Week?",
        },

        xAxis: {
          title: "",
          categories: xAxiesCategories,
        },

        yAxis: {
          title: "Gas Price (GWEI)",
          categories: [
            "12am",
            "1am",
            "2am",
            "3am",
            "4am",
            "5am",
            "6am",
            "7am",
            "8am",
            "9am",
            "10am",
            "11am",
            "12pm",
            "1pm",
            "2pm",
            "3pm",
            "4pm",
            "5pm",
            "6pm",
            "7pm",
            "8pm",
            "9pm",
            "10pm",
            "11pm",
            "12pm",
          ],
        },
        colorAxis: {
          min: 0,
          minColor: "#FFFFFF",
          maxColor: (Highcharts as any).getOptions().colors[0],
        },
        series: [
          {
            borderWidth: 1,
            data,
          },
        ],
      });
    };
    if (props.historicalGasData.length > 0) {
      asyncEffect();
    }
  }, [props.historicalGasData]);
  return (
    <div className="chart-line">
      <div id="line-container" style={{ width: "100%", height: "400px" }} />
    </div>
  );
};
export default ChartLine;
