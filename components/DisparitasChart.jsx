import React from "react";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const DisparitasChart = () => {
  const [provinceData, setProvinceData] = useState(null);

  useEffect(() => {
    fetch(
      "https://sp2kp-be-public.kemendag.go.id/api/map/get-data-list?idKomoditas=1613&tanggalMap=2023-11-27&token=cJAqgtf@ZWHGCRGngkGnjYKtPcsXnM!@uNWIMQEe"
    )
      .then((response) => response.json())
      .then((data) => {
        setProvinceData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching province data:", error);
      });
  }, []);

  if (!provinceData) {
    return <p>Loading...</p>;
  }

  const chartData = [
    ["Nama", "Harga Telur"],
    ...provinceData.map((province) => [
      province.provinsi,
      parseInt(province.harga, 10),
    ]),
  ];

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      data={chartData}
      options={{
        hAxis: {
          title: "Provinsi",
        },
        vAxis: {
          title: "Harga Telur",
        },
        colors: ["#5F6F52"],
      }}
    />
  );
};

export default DisparitasChart;
