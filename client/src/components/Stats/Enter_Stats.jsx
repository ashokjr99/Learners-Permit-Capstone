import React, { useState } from "react";
import Modal from "react-modal";
import "./ToggleSwitch.css";
Modal.setAppElement("#root");

const Enter_Stats = () => {
  const [hours, setHours] = useState("");
  const [day, setDay] = useState(false);
  const [vehicle_type, setVehicleType] = useState("");
  const [weather, setWeather] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [practiced, setPracticed] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const weatherOptions = ["Rainy", "Snowy", "Clear"];

  const vehicleTypes = ["Sedan", "Truck", "Van", "SUV", "Motorcycle"];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const statsData = {
        hours: parseInt(hours),
        day: true,
        vehicle_type: vehicle_type,
        weather,
        from,
        to,
        practiced,
        notes,
      };

      const sendNotification = async (e) => {
        e.preventDefault();
        try {
          console.log(first);
        } catch (err) {
          console.log(
            "There appears to have been an error sending a notification." + err
          );
        }
      };

      const response = await fetch("http://localhost:8081/stats/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statsData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Stats posted successfully:", data);
        closeModal(); // Close the modal after successful submission
      } else {
        if (response.status === 401) {
          console.error("Unauthorized access. Please log in again.");
          // Handle unauthorized access (e.g., redirect to login page)
        } else {
          console.error("Failed to post stats" + response);
          // Handle other errors if needed
        }
      }
    } catch (error) {
      console.error("Error posting stats:", error);
      // Handle errors if needed
    }
  };

  return (
    <div>
      <button onClick={openModal}>Enter Drive</button>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enter Stats Modal"
        appElement={document.getElementById("root")}
      >
        <div>
          <h2 className="text-center mb-4">Enter Your Drive</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="hours" className="block mb-1">
                Hours
              </label>
              <input
                type="text"
                id="hours"
                className="w-full border-gray-200 rounded-md p-2"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">
                {" "}
                {day === false ? "Night" : "Day"}
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={day}
                  onChange={(e) => setDay(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="vehicleType" className="block mb-1">
                Vehicle Type
              </label>
              <select
                id="vehicleType"
                className="w-full border-gray-200 rounded-md p-2"
                value={vehicle_type}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="weather" className="block mb-1">
                Weather
              </label>
              <select
                id="weather"
                className="w-full border-gray-200 rounded-md p-2"
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
              >
                <option value="">Select Weather</option>
                {weatherOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="from" className="block mb-1">
                From
              </label>
              <input
                type="text"
                id="from"
                className="w-full border-gray-200 rounded-md p-2"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="to" className="block mb-1">
                To
              </label>
              <input
                type="text"
                id="to"
                className="w-full border-gray-200 rounded-md p-2"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="practiced" className="block mb-1">
                Practiced
              </label>
              <input
                type="text"
                id="practiced"
                className="w-full border-gray-200 rounded-md p-2"
                value={practiced}
                onChange={(e) => setPracticed(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="practiced" className="block mb-1">
                Notes
              </label>
              <input
                type="text"
                id="notes"
                className="w-full border-gray-200 rounded-md p-2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Enter_Stats;
