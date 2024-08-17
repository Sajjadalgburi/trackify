import React, { useState } from "react";
import Modal from "./Modal";

interface LoginOrSignUpBtnProps {
  bothBtn: boolean;
}

const LoginOrSignUpBtn: React.FC<LoginOrSignUpBtnProps> = ({ bothBtn }) => {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);

  const handleOpenModal = (type: "login" | "register") => {
    setModalType(type);
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const renderBothBtns = () => (
    <>
      <button
        className="btn btn-outline px-7"
        onClick={() => handleOpenModal("register")}
      >
        Register
      </button>
      <button
        className="btn btn-accent px-7"
        onClick={() => handleOpenModal("login")}
      >
        Login
      </button>
      {modalType && <Modal type={modalType} />}
    </>
  );

  const renderRegisterBtn = () => (
    <>
      <button
        className="btn btn-outline px-7"
        onClick={() => handleOpenModal("register")}
      >
        Register
      </button>
      {modalType && <Modal type={modalType} />}
    </>
  );

  return bothBtn ? renderBothBtns() : renderRegisterBtn();
};

export default LoginOrSignUpBtn;
