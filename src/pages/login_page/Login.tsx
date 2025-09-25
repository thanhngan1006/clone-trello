import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import Logo from "../../assets/Logo.png";
import LoginImg from "../../assets/login_img.jpg";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Errors from "../../components/Errors";
import { useAuth } from "../../context/AuthContext";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export const Login = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  if (!loginContext) {
    throw new Error("Login must be used within a LoginProvider");
  }

  const {
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    errorMessage,
    setErrorMessage,
    isShowPassword,
    handleShowPassword,
  } = loginContext;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    console.log("auth", auth);
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      if (email === "") {
        setErrorMessage("Please enter email");
        return;
      }
      if (password === "") {
        setErrorMessage("Please enter password");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      navigate("/");
      console.log("User logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-1280 mx-auto h-screen flex gap-6 p-3 bg-loginBackgroundColor">
        {/* nua trai */}
        <div className="flex-1">
          <div className="flex p-2 mb-2 items-center justify-center  overflow-hidden ">
            <img src={Logo} alt="logo" className="w-14 h-14 rounded-full" />
          </div>
          <div className="flex flex-col gap-7 bg-white rounded-xl p-4  ">
            <span className="text-center text-2xl font-bold text-black">
              Sign In
            </span>
            <span className="text-center text-gray-400 mb-2">
              Welcome back! Please enter your details
            </span>

            <Form action="/" className="px-5" onSubmit={handleLogin}>
              <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  className="text-sm border border-gray-300 rounded-xl p-2.5"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    handleChangeEmail(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-1 mb-3 relative">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    className="text-sm border border-gray-300 rounded-xl p-2.5 w-full"
                    placeholder="Enter your password"
                    value={password}
                    autoComplete=""
                    onChange={(e) => {
                      handleChangePassword(e.target.value);
                    }}
                  />
                  <div
                    className="absolute right-0 bottom-0 top-0 flex items-center cursor-pointer px-2 py-1"
                    onClick={handleShowPassword}
                  >
                    {isShowPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* inset-y-0: top:0px, bottom: 0px */}
              </div>

              {errorMessage && <Errors message={errorMessage} />}

              <div className="flex">
                <div className="flex-1"></div>
                <Link
                  to="/reset-password"
                  className="text-blue-500 hover:underline mb-2"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button width="full" height="10" type="submit">
                Sign in
              </Button>
            </Form>
            <div className="px-5 flex gap-4 items-center justify-center mt-3 mb-3">
              <div className="flex-1 h-0.5 bg-gray-200"></div>
              <span className="text-gray-400 font-bold">OR</span>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-gray-400">Don't have an account?</span>
              <Link
                to="/sign-up"
                className="text-black hover:underline font-bold"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* nua phai */}
        <div className="bg-darkBlue flex-1 rounded-xl p-7 flex-col gap-5 ">
          <p className="text-white text-2xl  text-center font-bold">
            Welcome back!
          </p>
          <p className="text-white text-2xl  text-center font-bold">
            PLease sign in to your <br />
            TrelloMon account
          </p>
          <p className="text-gray-300 mt-4 font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            aliquam tempore rerum impedit eligendi delectus necessitatibus ipsa,
            esse vel dignissimos unde eos inventore. Sapiente voluptas officia
            impedit similique ipsum excepturi?
          </p>
          <div className="w-full max-w-sm mx-auto mt-10">
            <img
              src={LoginImg}
              alt="anh login"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
