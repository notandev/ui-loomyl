import { useState } from "react";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-datepicker/dist/react-datepicker.css"; // Import the necessary CSS
import Footer from "../Ui/Footer";
import Navbar from "../Ui/Navbar";

function Calculator() {
  const [startDate, setStartDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [bornPrediction, setBornPrediction] = useState("");

  const handleDateChange = (date) => {
    setDate(date);
    setStartDate(date);
  };

  const hitungTanggalHPHT = (tanggalHPHT) => {
    const date = new Date(tanggalHPHT);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let dueDay, dueMonth, dueYear;

    if (month < 2 || (month === 2 && day < 25)) { 
      dueDay = day + 7;
      dueMonth = month + 9;
      dueYear = year;
    } else {
      dueDay = day + 7;
      dueMonth = month - 3;
      dueYear = year + 1;
    }

    if (dueDay > 30) {
      dueDay -= 30;
      dueMonth += 1;
    }

    if (dueMonth > 11) {
      dueMonth -= 12;
      dueYear += 1;
    }

    return new Date(dueYear, dueMonth, dueDay);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  const handleCount = () => {
    if (startDate) {
      const predictionDate = hitungTanggalHPHT(startDate.toISOString().slice(0, 10));
      setBornPrediction(predictionDate.toDateString());
    }
  };

  return (
    <div className="w-screen bg-calendar-page bg-cover bg-no-repeat">
      <Navbar />
      <section className="px-10 py-20 w-11/12 mx-auto">
        <h1 className="text-5xl font-bold text-white">Prediksi Kelahiran Anak</h1>
        <p className="text-sm text-white font-thin">Isikan data di bawah ini untuk menghitung perkiraan tanggal lahir Anda</p>
      </section>
      <div className="py-20 flex">
        <div className="mx-auto mt-8">
          <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
            <button onClick={handlePreviousMonth}>&lt;</button>
            <span>{date.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</span>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
          <Calendar
            value={date}
            onChange={handleDateChange}
            locale="id-ID"
            nextLabel={null}
            prevLabel={null}
            showNeighboringMonth={true}
            className="border-none rounded-b-lg bg-white"
          />
        </div>
        <div className="flex p-6 rounded-lg shadow-md mx-auto">
          <div className="mb-4 flex-grow">
            <div>
              <label className="block text-white text-sm mb-2" htmlFor="startDate">
                Hari Pertama HPHT:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Hari Pertama..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <label className="block text-white text-sm mb-2" htmlFor="bornPrediction">
                Prediksi Kelahiran:
              </label>
              <input
                type="text"
                id="bornPrediction"
                value={bornPrediction}
                readOnly
                placeholder="Hasil..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <button
            onClick={handleCount}
            className="ml-4 px-4 mt-7 py-2 bg-white text-black rounded-md hover:bg-blue-600 self-start"
          >
            Hitung
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Calculator;