// pages/index.js
import { useState } from "react";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("2021");
  const [priceData, setPriceData] = useState(null);

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleFetchPrice = async () => {
    try {
      const response = await fetch(
        `/api/HargaTelurNasional?year=${selectedYear}`
      );
      const data = await response.json();
      setPriceData(data);
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  };

  return (
    <div>
      <label>
        Pilih Tahun:
        <select value={selectedYear} onChange={handleChangeYear}>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </label>
      <button onClick={handleFetchPrice}>Submit</button>

      {priceData && (
        <div>
          <h2>Harga Telur untuk Tahun {priceData.year}:</h2>
          <ul>
            {Object.entries(priceData.prices).map(([month, price]) => (
              <li key={month}>
                {month}: {price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
