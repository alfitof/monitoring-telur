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

    const today = new Date();
    setCurrentDate(today.toISOString().slice(0, 10));
    setFormattedCurrentDate(formatDate(today));

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    setPreviousDate(yesterday.toISOString().slice(0, 10));
    setFormattedPreviousDate(formatDate(yesterday));
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

        // Menyimpan data dari details komoditas pertama (ubah sesuai kebutuhan)
        const allDetailsData = data.data.flatMap(
          (komoditas) => komoditas.details
        );
        setTableDataPenting(allDetailsData);

        // Anda dapat menyimpan data detailsData dalam state atau menggunakannya sesuai kebutuhan
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDatas();

    // ... (kode date formatting tetap sama)
  }, []);

  const handleChange = (e) => {
    const inputDate = e.target.value;
    const formattedDate = formatDate(new Date(inputDate));
    setCurrentDate(inputDate);

    // Update formattedPreviousDate and formattedCurrentDate based on the input IDs
    if (e.target.id === "hari_ini") {
      setFormattedCurrentDate(formattedDate);
    } else if (e.target.id === "hari_kemarin") {
      setFormattedPreviousDate(formattedDate);
    }
  };

  const formatDate = (dateObject) => {
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      dateObject
    );
    return `${day} ${month}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-12 bg-[#F4DFB6] rounded-xl m-14">
      <div className="col-span-1">
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
            disabled
            id="countries_disabled"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Ayam Telur Ras</option>
          </select>
        </div>
        <div className=" grid grid-cols-2">
          {/* INPUTAN PROVINSI */}
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
          {/* INPUTAN KAB/KOTA */}
          <div className=" p-4">
            <label
              htmlFor="countries_disabled"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Kab/Kota
            </label>
            <select
              id="countries_disabled"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>Semua</option>
            </select>
          </div>
        </div>
        <div className=" grid grid-cols-2">
          {/* INPUTAN HARGA HARI INI */}
          <div className=" p-4">
            <label
              htmlFor="hari_ini"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Harga Hari Ini
            </label>
            <input
              type="date"
              id="hari_ini"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={currentDate}
              onChange={handleChange}
            />
          </div>
          {/* INPUTAN PERBANDINGAN HARGA*/}
          <div className=" p-4">
            <label
              htmlFor="hari_kemarin"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Perbandingan Harga
            </label>
            <input
              type="date"
              id="hari_kemarin"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={previousDate}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* TABEL PERBANDINGAN HARGA BARANG*/}
        <div className="px-4 pb-4 pt-2 ">
          <h1 className="text-md font-semibold py-3 text-gray-900 mb-2 text-center">
            Perbandingan Harga Barang Kebutuhan Pokok Nasional
          </h1>
          <div className="relative overflow-x-auto max-h-[400px] shadow-xl sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-[#DED0B6] ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Komoditas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Satuan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {formattedPreviousDate}
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[92px]">
                    {formattedCurrentDate}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Persentase
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.commodity_name}
                    </th>
                    <td className="px-6 py-3">{item.measurement}</td>
                    <td className="px-6 py-3">{item.price_1}</td>
                    <td className="px-6 py-3">{item.price_2}</td>
                    <td className="px-6 py-3">{item.percent_change}%</td>
                    <td className="px-6 py-3 uppercase font-bold text-xs">
                      <div className="w-4 h-4">
                        <Image
                          src={`https://ews.kemendag.go.id/markers/${item.indicator_link}`}
                          width={1000}
                          height={1000}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="py-4">
          <div className=" grid grid-cols-2">
            {/* INPUTAN HARGA HARI INI */}
            <div className=" p-4">
              <label
                htmlFor="hari_ini"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Harga Hari Ini
              </label>
              <input
                type="date"
                id="hari_ini"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={currentDate}
                onChange={handleChange}
              />
            </div>
            {/* INPUTAN PERBANDINGAN HARGA*/}
            <div className=" p-4">
              <label
                htmlFor="hari_kemarin"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Perbandingan Harga
              </label>
              <input
                type="date"
                id="hari_kemarin"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={previousDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* TABEL PERBANDINGAN HARGA BARANG PENTING*/}
        <div className="px-4 pb-4 pt-2 ">
          <h1 className="text-md font-semibold py-3 text-gray-900 mb-2 text-center">
            Perbandingan Harga Barang Penting
          </h1>
          <div className="relative overflow-x-auto max-h-[439px] shadow-xl sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-[#DED0B6]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Komoditas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Satuan
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[92px]">
                    {formattedPreviousDate}
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-[92px]">
                    {formattedCurrentDate}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Persentase
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableDataPenting.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.variant}
                    </th>
                    <td className="px-6 py-3">{item.satuan}</td>
                    <td className="px-6 py-3">{item.hargaperbandingan}</td>
                    <td className="px-6 py-3">{item.harga}</td>
                    <td className="px-6 py-3">{item.persen}%</td>
                    <td className="px-6 py-3 uppercase font-bold text-xs">
                      <div className="w-4 h-4">
                        <Image
                          src={`https://ews.kemendag.go.id/markers/${item.indikator}`}
                          width={1000}
                          height={1000}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
