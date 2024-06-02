import React, { useState } from "react";
import Modal from "react-modal";
import "./ToggleSwitch.css";
Modal.setAppElement("#root");
import { API_URL } from "../../helpers/api";

const Enter_Stats = ({ modalIsOpen, setModalIsOpen }) => {
  const [hours, setHours] = useState("");
  const [day, setDay] = useState(true);
  const [vehicle_type, setVehicleType] = useState("");
  const [weather, setWeather] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [practiced, setPracticed] = useState("");
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
        hours: parseFloat(hours),
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

      const response = await fetch(`${API_URL}/stats/post`, {
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
        setModalIsOpen(false); // Close the modal after successful submission
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
    <div style={{ marginLeft: "15%" }}>
      {/* <button onClick={openModal}>Enter Drive</button> */}

      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Enter Stats Modal"
        appElement={document.getElementById("root")}
        style={{ content: { left: "60%" } }}
      >
        <div>
          <h2 className="text-center mb-4 roboto-regular">Enter Your Drive</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="hours" className="block mb-1 roboto-regular">
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
              <label className="block mb-1 roboto-regular">
                {" "}
                {day === true ? "Day" : "Night"}
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={day}
                  defaultChecked={day}
                  onChange={(e) => setDay(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="mb-4">
              <label
                htmlFor="vehicleType"
                className="block mb-1 roboto-regular"
              >
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
              <label htmlFor="weather" className="block mb-1 roboto-regular">
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
              <label htmlFor="from" className="block mb-1 roboto-regular">
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
              <label htmlFor="to" className="block mb-1 roboto-regular">
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
              <label htmlFor="practiced" className="block mb-1 roboto-regular">
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
              <label htmlFor="practiced" className="block mb-1 roboto-regular">
                Notes
              </label>
              <textarea
                rows={4}
                id="notes"
                className="w-full border-gray-200 rounded-md p-2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md roboto-regular"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Enter_Stats;
