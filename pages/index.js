import Image from "next/image";
import { Inter } from "next/font/google";
import DisparitasMap from "@/components/DisparitasMap";
import React, { useState, useEffect } from "react";
import { Datepicker } from "flowbite-react";
import HargaChart from "@/components/HargaChart";
import DisparitasChart from "@/components/DisparitasChart";

const Home = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [previousDate, setPreviousDate] = useState("");
  const [formattedCurrentDate, setFormattedCurrentDate] = useState("");
  const [formattedPreviousDate, setFormattedPreviousDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableDataPenting, setTableDataPenting] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://sp2kp-be-public.kemendag.go.id/api/komoditas_table/get-data-list?idprov=&idkab=&tglharga=2023-11-27&tglperbandingan=2023-11-26&token=cJAqgtf@ZWHGCRGngkGnjYKtPcsXnM!@uNWIMQEe"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setTableData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await fetch(
          "https://sp2kp-be-public.kemendag.go.id/api/table_harga/harga_barang_penting?idprov=&idkab=&minggu=2023-W48&minggu_perbandingan=2023-W47&token=cJAqgtf@ZWHGCRGngkGnjYKtPcsXnM!@uNWIMQEe"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const allDetailsData = data.data.flatMap(
          (komoditas) => komoditas.details
        );
        setTableDataPenting(allDetailsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDatas();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 py-6 lg:p-12 bg-[#f8e5bc] rounded-xl m-6 lg:m-14">
      <div className="col-span-1">
        <div className="p-4 mb-4">
          <h1 className="text-2xl font-bold mb-2">
            Perkembangan Harga Per Daerah
          </h1>
          <h1 className="text-sm mb-1">Komoditas: Telur Ayam Ras</h1>
          <h1 className="text-sm mb-1">Provinsi: Nasional</h1>
          <h1 className="text-sm mb-1">Kabupaten/Kota: Semua</h1>
          <h1 className="text-sm mb-4">Pasar: Semua</h1>
          <hr className="border-black" />
        </div>
        {/* PETA DISPARITAS */}
        <div className="px-4 w-full pb-4 mb-4">
          <label
            htmlFor="countries_disabled"
            className="block mb-6 text-center text-md font-medium text-gray-900"
          >
            Peta Disparitas Harga Telur Ayam Ras {formattedCurrentDate} 2023
          </label>
          <DisparitasMap />
        </div>
        {/* GRAFIK PERGERAKAN */}
        <div className="p-4 ">
          <div className=" pb-4 ">
            <label
              htmlFor="countries_disabled"
              className="block mb-8 text-center text-md font-medium text-gray-900"
            >
              Grafik Pergerakan Harga Telur Ayam Ras Nasional
            </label>
            <HargaChart />
          </div>
        </div>
        {/* GRAFIK DISPARITAS */}
        <div className="p-4 mb-4">
          <label
            htmlFor="countries_disabled"
            className="block text-center text-md mb-8 font-medium text-gray-900"
          >
            Peta Disparitas Harga Telur Ayam Ras {formattedCurrentDate} 2023
          </label>
          <DisparitasChart />
        </div>
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
            id="countries_disabled"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Nasional</option>
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

        <div className=" grid grid-cols-2" id="bulan_tahun">
          {/* INPUTAN HARGA HARI INI */}
          <div className=" p-4">
            <label
              htmlFor="countries_disabled"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Pilih Bulan:
            </label>
            <select
              id="countries_disabled"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected value="1">
                Januari
              </option>
              <option value="2">Februari</option>
              <option value="3">Maret</option>
              <option value="4">April</option>
              <option value="5">Mei</option>
              <option value="6">Juni</option>
              <option value="7">Juli</option>
              <option value="8">Agustus</option>
              <option value="9">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
          </div>
          {/* INPUTAN PERBANDINGAN HARGA*/}
          <div className=" p-4">
            <label
              htmlFor="countries_disabled"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Pilih Tahun:
            </label>
            <select
              id="countries_disabled"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected value="2019">
                2019
              </option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
        <div className="p-4 mt-2 w-full">
          <button
            className="bg-[#5F6F52] w-full text-white px-4 py-2 rounded-lg"
            onClick={() => {
              // Logika
            }}
          >
            Lihat Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
