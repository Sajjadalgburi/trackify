import { useRouter } from "next/navigation";

const LoginOrSignUpBtn = ({ showRegister }: { showRegister: boolean }) => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  // this is the login button
  const LoginBtn = () => {
    return (
      <button className="btn btn-neutral" onClick={handleLoginClick}>
        Login
      </button>
    );
  };

  // this is the register button
  const RegisterBtn = () => {
    return (
      <button className="btn btn-outline" onClick={handleRegisterClick}>
        Register
      </button>
    );
  };

  return showRegister ? <RegisterBtn /> : <LoginBtn />;
};

export default LoginOrSignUpBtn;
