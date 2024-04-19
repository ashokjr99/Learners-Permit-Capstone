import React, {useState} from "react";
import Modal from "react-modal"
Modal.setAppElement("#root");

const Login = ({ handleChange, handleLogin }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="login" style={{ padding: "2em" }}>
       <button onClick={openModal}>
        Login
      <Modal
      className={"modal"}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
        contentLabel="Login"
        appElement={document.getElementById("root")}>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <h2>Login</h2>
          <label>Email</label>
          <input onChange={(e) => handleChange("email", e.target.value)} />
          <label>Password</label>
          <input onChange={(e) => handleChange("password", e.target.value)} />
          <button
            style={{ margin: "1em", width: "9em" }}
            type="button"
            onClick={handleLogin}
          >
            Log In!
          </button>
        </form>
        </Modal>
      </button>
    </div>
  );
};

export default Login;
