import PropTypes from "prop-types";
import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  const { title, data, labels, height, width } = props;

  return (
    <Pie
      data={{
        datasets: [
          {
            data,
            backgroundColor: [
              "rgba(247, 202, 24, 0.7)",
              "rgba(80, 255, 140, 0.7)",
              "rgba(255, 50, 70, 0.7)",
              "rgba(50, 120, 255, 0.7)",
              "rgba(180, 130, 130, 0.7)",
              "rgba(191, 85, 236, 0.7)",
              "rgba(255, 100, 100, 0.7)",
              "rgba(250, 190, 88, 0.7)",
              "rgba(100, 255, 100, 0.7)",
            ],
          },
        ],
        labels,
      }}
      height={height || 90}
      width={width || 100}
      options={{
        animation: {
          duration: 2000,
        },
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          position: "top",
          fontSize: 15,
          text: title,
        },
      }}
    />
  );
};

PieChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default PieChart;
