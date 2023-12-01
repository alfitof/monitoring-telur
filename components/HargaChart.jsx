import React from "react";
import Chart from "react-google-charts";

const HargaChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <p className="text-center text-red-500">Masukan data terlebih dahulu</p>
    );
  }

  const chartData = [
    ["Bulan", "Harga"],
    ...Object.entries(data).map(([month, price]) => [month, price]),
  ];

  const chartOptions = {
    hAxis: {
      title: "Bulan",
    },
    vAxis: {
      title: "Harga",
    },
    colors: ["#5F6F52"],
    animation: {
      startup: true,
      easing: "out",
      duration: 1000,
      startupExp: 3,
      frames: 60,
      sequenceNumber: 1,
    },
  };

  return (
    <div>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="LineChart"
        data={chartData}
        options={chartOptions}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default HargaChart;
