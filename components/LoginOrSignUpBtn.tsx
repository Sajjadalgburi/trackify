import React, { useState } from "react";
import Modal from "./Modal";

const LoginOrSignUpBtn = () => {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  const handleOpenModal = (type: "login" | "register") => {
    setModalType(type);
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <button
        className="btn btn-outline"
        onClick={() => handleOpenModal("register")}
      >
        Register
      </button>
      <button
        className="btn btn-neutral"
        onClick={() => handleOpenModal("login")}
      >
        Login
      </button>
      {modalType && <Modal type={modalType} />}
    </>
  );
};

export default LoginOrSignUpBtn;
