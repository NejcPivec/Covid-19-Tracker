import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "../style/Graph.css";

const Graph = ({ casesType, ...props }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const getGraphData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((res) => res.json())
        .then((data) => {
          const chartData = buildChartData(data, casesType);
          setGraphData(chartData);
        });
    };
    getGraphData();
  }, [casesType]);

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  // Change color for graph
  const graphColor = (casesType) => {
    if (casesType === "cases") {
      return "red";
    } else if (casesType === "deaths") {
      return "black";
    } else if (casesType === "recovered") {
      return "greenyellow";
    }
  };

  return (
    <div className="graph-container">
      {graphData?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: graphColor(casesType),

                data: graphData,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default Graph;
