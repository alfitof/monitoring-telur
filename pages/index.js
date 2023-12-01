import DisparitasMap from "@/components/DisparitasMap";
import HargaChart from "@/components/HargaChart";
import DisparitasChart from "@/components/DisparitasChart";
import React, { useState } from "react";

const Home = () => {
  const [selectedYear, setSelectedYear] = useState("2021");
  const [selectedProvinsi, setSelectedProvinsi] = useState("Nasional");
  const [labelTahun, setLabelTahun] = useState("2021");
  const [labelProvinsi, setLabelProvinsi] = useState("Nasional");
  const [priceData, setPriceData] = useState(null);

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleChangeProvinsi = (event) => {
    setSelectedProvinsi(event.target.value);
  };

  const handleFetchPrice = async () => {
    try {
      const response = await fetch(
        `/api/HargaTelurNasional?year=${selectedYear}&provinsi=${selectedProvinsi}`
      );
      const data = await response.json();
      setPriceData(data);
      // Pindahkan pembaruan selectedYear ke dalam handleFetchPrice
      setLabelProvinsi(selectedProvinsi);
      setLabelTahun(selectedYear);
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 py-6 lg:p-12 bg-[#f8e5bc] rounded-xl m-6 lg:m-14">
      <div className="col-span-1">
        <div className="p-4 mb-4">
          <h1 className="text-2xl font-bold mb-2">
            Perkembangan Harga Per Daerah
          </h1>
          <h1 className="text-sm mb-1">Komoditas: Telur Ayam Ras</h1>
          <h1 className="text-sm mb-1">Provinsi: {labelProvinsi}</h1>
          <h1 className="text-sm mb-1">Kabupaten/Kota: Semua</h1>
          <h1 className="text-sm mb-1">Pasar: Semua</h1>
          <h1 className="text-sm mb-4">Tahun: {labelTahun}</h1>
          <hr className="border-black" />
        </div>
        {/* PETA DISPARITAS */}
        {/* <div className="px-4 w-full pb-4 mb-4">
          <label
            htmlFor="countries_disabled"
            className="block mb-6 text-center text-md font-medium text-gray-900"
          >
            Peta Disparitas Harga Telur Ayam Ras 2023
          </label>
          <DisparitasMap />
        </div> */}
        {/* GRAFIK PERGERAKAN */}
        <div className="p-4 ">
          <div className=" pb-4 ">
            <label
              htmlFor="countries_disabled"
              className="block mb-8 text-center text-md font-medium text-gray-900"
            >
              Grafik Pergerakan Harga Telur Ayam Ras {labelProvinsi}{" "}
              {labelTahun}
            </label>
            <HargaChart data={priceData?.prices} />
          </div>
        </div>
        {/* GRAFIK DISPARITAS */}
        {/* <div className="p-4 mb-4">
          <label
            htmlFor="countries_disabled"
            className="block text-center text-md mb-8 font-medium text-gray-900"
          >
            Peta Disparitas Harga Telur Ayam Ras 2023
          </label>
          <DisparitasChart />
        </div> */}
      </div>

      <div className="col-span-1">
        {/* INPUTAN KOMODITAS */}
        <div className=" px-4 pb-4">
          <label
            htmlFor="countries_disabled"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Komoditi
          </label>
          <select
            id="countries_disabled"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Ayam Telur Ras</option>
          </select>
        </div>
        <div className=" p-4">
          <label
            htmlFor="countries_disabled"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Provinsi
          </label>
          <select
            value={selectedProvinsi}
            onChange={handleChangeProvinsi}
            id="countries_disabled"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="Nasional">Nasional</option>
            <option value="Aceh">Aceh</option>
          </select>
        </div>
        <div className=" p-4">
          <label
            htmlFor="countries_disabled"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Kabupaten/Kota
          </label>
          <select
            id="countries_disabled"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Semua</option>
          </select>
        </div>
        <div className=" p-4">
          <label
            htmlFor="countries_disabled"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Pasar
          </label>
          <select
            id="countries_disabled"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Semua</option>
          </select>
        </div>
        <div className=" p-4">
          <label
            htmlFor="countries_disabled"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Pilih Tahun:
          </label>
          <select
            id="countries_disabled"
            value={selectedYear}
            onChange={handleChangeYear}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div className="p-4 mt-2 w-full">
          <button
            className="bg-[#5F6F52] hover:bg-[#4d5c40] w-full text-white px-4 py-2 rounded-lg"
            onClick={handleFetchPrice}
          >
            Lihat Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
