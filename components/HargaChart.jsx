import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

const HargaChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Panggil API di sini
    fetch(
      "https://sp2kp-be-public.kemendag.go.id/api/grafik_harga?variant=1613&tanggal=2023-11-27&token=cJAqgtf@ZWHGCRGngkGnjYKtPcsXnM!@uNWIMQEe"
    ) // Gantilah URL_API_ANDA dengan URL API yang sesuai
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching price data:", error);
      });
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }
  const chartData = [
    ["Date", "Price"],
    ...data.map((price) => [price.tanggal, parseInt(price.harga, 10)]),
  ];

  const chartOptions = {
    hAxis: {
      title: "Date",
    },
    vAxis: {
      title: "Price",
    },
    colors: ["#5F6F52"],
  };

  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading...</div>}
      data={chartData}
      options={chartOptions}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default HargaChart;
