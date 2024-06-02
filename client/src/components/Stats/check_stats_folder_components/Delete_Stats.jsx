import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import "../ToggleSwitch.css";
Modal.setAppElement("#root");
import { API_URL } from "../../../helpers/api";

const Delete_Stats = ({ stats, setReFetch }) => {
  const [openModal, setOpenModal] = useState(false);

  const deleteStat = async () => {
    try {
      const response = await fetch(
        `${API_URL}/stats/delete/${stats.id}`,

        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("MyToken"),
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      setReFetch((prev) => !prev);

      console.log(json);
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Delete</button>
      <Modal
        isOpen={openModal}
        contentLabel="Delete Stats Modal"
        appElement={document.getElementById("root")}
        className="modal"
      >
        <div>
          <form>
            <p>
              Are you sure you want to delete your drive? You will lose access
              to this drive's data permanently.
            </p>

            <button onClick={() => deleteStat()}>Yes</button>
            <button onClick={() => setOpenModal(false)}>No</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Delete_Stats;
