import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import "../ToggleSwitch.css";
Modal.setAppElement("#root");

const Delete_Stats = ({ stats, setReFetch }) => {
  const [openModal, setOpenModal] = useState(false);

  const deleteStat = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/stats/delete/${stats.id}`,

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
              Are you sure you want to delete your drive? The request will be
              sent to the parent.
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
