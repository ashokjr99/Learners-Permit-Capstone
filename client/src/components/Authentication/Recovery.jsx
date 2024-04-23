import React, { useState } from 'react';
import Modal from "react-modal"
Modal.setAppElement("#root");

const Recovery = ({ handleChange, handleRecovery }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='recovery' style={{ padding: '2em' }}>
      <button style={{width: "11em"}} onClick={openModal}>
        Forgot Password
      </button>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Forgot Password"
      >
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
          <h2>Forgot Password</h2>
          <label>Email</label>
          <input onChange={(e) => handleChange('email', e.target.value)} style={{width: "30em"}}/>
          <button
            style={{ margin: '1em', width: '9em' }}
            type='button'
            onClick={handleRecovery}
          >
            Send Recovery Email
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Recovery;