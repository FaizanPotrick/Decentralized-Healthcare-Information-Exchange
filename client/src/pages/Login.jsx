import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import ImageLight from "../assets/img/login-image.png";
import { Button } from "@windmill/react-ui";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const { setIsLogin, isLogin, setAlert, setIsLoading } =
    useContext(StateContext);
  const [login, setLogin] = useState({
    email_address: "",
    password: "",
  });

  useEffect(() => {
    if (isLogin) {
      window.location.href = "/app";
    }
  }, [setIsLogin]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/login", login);
      console.log(data);
      setLogin({
        email_address: "",
        password: "",
      });
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setAlert({
        isAlert: true,
        type: error.response.data.type,
        message: error.response.data.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl border border-gray-200/80">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2 hidden md:block">
            <img
              aria-hidden="true"
              className="object-contain w-full h-full"
              src={ImageLight}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={onSubmit}>
              <h1 className="mb-4 text-xl font-semibold text-gray-700">
                Login
              </h1>
              <div>
                <label className="input_label">Email Address</label>
                <input
                  className="input_field"
                  type="email"
                  name="email_address"
                  placeholder="john@doe.com"
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
                  placeholder="***************"
                  value={login.password}
                  onChange={onChange}
                  required
                />
              </div>
              <Button className="mt-4" block tag={Link} to="/app">
                Log in
              </Button>
              <hr className="my-4" />
              <Link
                className="text-sm font-medium text-purple-600 hover:underline"
                to="/create-account"
              >
                Sign Up
              </Link>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
