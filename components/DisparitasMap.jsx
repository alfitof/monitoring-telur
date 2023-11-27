import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

function Maps() {
  const [provinceData, setProvinceData] = useState(null);

  useEffect(() => {
    // Panggil API di sini
    fetch(
      "https://sp2kp-be-public.kemendag.go.id/api/map/get-data-list?idKomoditas=1613&tanggalMap=2023-11-27&token=cJAqgtf@ZWHGCRGngkGnjYKtPcsXnM!@uNWIMQEe"
    ) // Gantilah URL_API_ANDA dengan URL API yang sesuai
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

  const allProvinceCodes = provinceData.map((province) => province.id);

  const chartData = [
    ["Province", "Nama", "Harga Telur"],
    ...provinceData.map((province) => [
      province.id,
      province.provinsi,
      province.harga,
    ]),
  ];

  return (
    <div>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const selectedProvince = provinceData[selection[0].row];
              console.log("Selected Province:", selectedProvince);
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="350px" // Meningkatkan tinggi peta
        data={chartData}
        options={{
          region: "ID",
          resolution: "provinces",
          keepAspectRatio: true,
          colorAxis: {
            colors: ["#F1EB90", "#F3B664", "#EC8F5E"],
          },
          datalessRegionColor: "transparent",
        }}
      />
    </div>
  );
}

export default Maps;
