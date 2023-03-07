import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import ImageLight from "../assets/img/login-image.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLogin, isLogin, setAlert, setLoading } =
    useContext(StateContext);
  const [login, setLogin] = useState({
    email_address: "",
    password: "",
  });

  useEffect(() => {
    if (isLogin) {
      navigate(-1);
    }
  }, [setIsLogin]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("/api/login", login);
      setLogin({
        email_address: "",
        password: "",
      });
      setIsLogin(true);
      navigate("/dashboard");
    } catch (error) {
      setAlert({
        isAlert: true,
        type: error.response.data.type,
        message: error.response.data.message,
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <div className="flex flex-col md:flex-row h-full w-full max-w-lg sm:max-w-4xl bg-white rounded-xl shadow-xl border border-gray-200/80">
        <img
          className="object-contain w-full rounded-l-xl h-auto md:w-1/2 hidden md:block"
          src={ImageLight}
          alt="logo"
        />
        <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <form className="w-full" onSubmit={onSubmit}>
            <h1 className="mb-4 text-xl font-semibold text-gray-700">Login</h1>
            <div>
              <label className="input_label">Email Address</label>
              <input
                className="input_field"
                type="email"
                name="email_address"
                placeholder="example@gamil.com"
                value={login.email_address}
                onChange={onChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="input_label">Password</label>
              <input
                className="input_field"
                type="password"
                name="password"
                placeholder="********"
                value={login.password}
                onChange={onChange}
                autoComplete="off"
                required
              />
            </div>
            <button type="submit" className="input_button">
              Login
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
