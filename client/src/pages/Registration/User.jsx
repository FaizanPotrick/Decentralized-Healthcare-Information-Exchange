import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const User = ({ type_of_user }) => {
  const navigate = useNavigate();
  const { setIsLogin, isLogin, setAlert, setIsLoading } =
    useContext(StateContext);
  const [register, setRegister] = useState({
    name: "",
    email_address: "",
    type_of_user: type_of_user,
    registration_number: "",
    wallet_address: "",
    gst_number: "",
    password: "",
    cPassword: "",
  });

  useEffect(() => {
    if (isLogin) {
      navigate(-1);
    }
  }, [setIsLogin]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { password, cPassword } = register;
    if (password !== cPassword) {
      setAlert({
        isAlert: true,
        type: "error",
        message: "Password do not match",
      });
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/registration/${type_of_user}`,
        register
      );
      setRegister({
        name: "",
        email_address: "",
        type_of_user: "",
        registration_number: "",
        wallet_address: "",
        gst_number: "",
        password: "",
        cPassword: "",
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
    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="flex h-full w-full max-w-2xl bg-white rounded-xl shadow-xl border border-gray-200/80">
        <main className="p-6 sm:p-12 w-full">
          <h1 className="mb-4 text-xl font-semibold text-gray-700">Sign Up</h1>
          <form className="w-full" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input_label">Name*</label>
                <input
                  className="input_field"
                  type="text"
                  name="name"
                  value={register.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="input_label">Email Address*</label>
                <input
                  className="input_field"
                  type="email"
                  name="email_address"
                  value={register.email_address}
                  onChange={onChange}
                  required
                />
              </div>
              {type_of_user === "doctor" && (
                <div>
                  <label className="input_label">Registration Number*</label>
                  <input
                    className="input_field"
                    type="text"
                    name="registration_number"
                    value={register.registration_number}
                    onChange={onChange}
                    required
                  />
                </div>
              )}
              <div>
                <label className="input_label">Wallet Address*</label>
                <input
                  className="input_field"
                  type="text"
                  name="wallet_address"
                  value={register.wallet_address}
                  onChange={onChange}
                  required
                />
              </div>
              {type_of_user === "buyer" && (
                <div>
                  <label className="input_label">GST Number</label>
                  <input
                    className="input_field"
                    type="text"
                    name="gst_number"
                    value={register.gst_number}
                    onChange={onChange}
                    required
                  />
                </div>
              )}
              <div>
                <label className="input_label">Password*</label>
                <input
                  className="input_field"
                  type="password"
                  name="password"
                  value={register.password}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="input_label">Confirm Password*</label>
                <input
                  className="input_field"
                  type="password"
                  name="cPassword"
                  value={register.cPassword}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="input_button">
              Sign Up
            </button>
          </form>
          <div className="text-sm font-medium text-center mt-1 text-gray-700">
            Already have an account?
            <Link className="text-purple-600 hover:underline ml-1" to="/login">
              Login
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default User;
