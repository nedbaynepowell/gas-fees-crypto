import { useEffect } from "react";
import moment from "moment";
import Highcharts from "highcharts";
import "./style.scss";

require("highcharts/modules/heatmap")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);

interface Props {
  historicalGasData: any;
}

const ChartHeatmap = (props: Props) => {
  function getPointCategoryName(point: any, dimension: any) {
    var series = point.series,
      isY = dimension === "y",
      axis = series[isY ? "yAxis" : "xAxis"];
    return axis.categories[point[isY ? "y" : "x"]];
  }
  useEffect(() => {
    const asyncEffect = async () => {
      const data = [];
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          data.push([day, hour, 0]);
        }
      }
      for (const [timestamp, gwei] of props.historicalGasData) {
        const day = parseInt(moment(timestamp).format("d"));
        const hour = parseInt(moment(timestamp).format("H"));
        const row = data.filter((d) => d[0] === day && d[1] === hour)[0];
        row[2] += gwei;
      }
      const hours: any = {};
      for (const d of data) {
        hours[d[1]] = 1;
      }
      (Highcharts as any).chart("heatmap-container", {
        chart: {
          type: "heatmap",
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1,
        },
        title: {
          text: "What is Gas Price by Time of Day?",
        },
        legend: {
          enabled: true,
        },

        xAxis: {
          title: "",
          categories: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },

        yAxis: {
          title: "",
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
        tooltip: {
          formatter: (point: any) => {
            return (
              "<b>" +
              getPointCategoryName(point, "x") +
              "</b> sold <br><b>" +
              point.value +
              "</b> items on <br><b>" +
              getPointCategoryName(point, "y") +
              "</b>"
            );
          },
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
    <div className="chart-heatmap">
      <div id="heatmap-container" style={{ width: "100%", height: "400px" }} />
    </div>
  );
};
export default ChartHeatmap;
