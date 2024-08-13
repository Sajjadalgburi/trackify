import LoginOrSignUpForm from "./LoginOrSignUpForm";

interface ModalProps {
  type: "login" | "register";
}

const Modal = ({ type }: ModalProps) => {
  return (
    <dialog id="my_modal" className="modal">
      <div className="modal-box shadow-3xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {/* Conditionally rendering the form based on the 'register' prop */}
        <LoginOrSignUpForm type={type} />
      </div>
    </dialog>
  );
};

export default Modal;
