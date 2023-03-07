import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Report = () => {
  const navigate = useNavigate();
  const { setIsLogin, isLogin, setAlert, setIsLoading } =
    useContext(StateContext);
  const [type_of_user] = useState("patient");
  const [register, setRegister] = useState({
    patient_id: "",
    name: "",
    description: "",
    age: "",
    type: "",
    disease: "",
    criticality: "",
    date: "",
    price: "",
    report: "",
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
      await axios.post(`/api/registration/report/${type_of_user}`, register);
      setRegister({
        patient_id: "",
        name: "",
        description: "",
        age: "",
        type: "",
        disease: "",
        criticality: "",
        date: "",
        price: "",
        report: "",
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
          <h1 className="mb-4 text-xl font-semibold text-gray-700">Report</h1>
          <form className="w-full" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {type_of_user === "doctor" && (
                <div>
                  <label className="input_label">Patient ID*</label>
                  <input
                    className="input_field"
                    type="text"
                    name="patient_id"
                    value={register.patient_id}
                    onChange={onChange}
                    required
                  />
                </div>
              )}
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
                <label className="input_label">Description*</label>
                <input
                  className="input_field"
                  type="text"
                  name="description"
                  value={register.description}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="input_label">Patient Age*</label>
                <input
                  className="input_field"
                  type="text"
                  name="age"
                  value={register.age}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="input_label">Type od Report*</label>
                <input
                  className="input_field"
                  type="text"
                  name="type"
                  value={register.type}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="input_label">Disease*</label>
                <input
                  className="input_field"
                  type="text"
                  name="disease"
                  value={register.disease}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="input_label">Criticality*</label>
                <input
                  className="input_field"
                  type="text"
                  name="criticality"
                  value={register.criticality}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="input_label">Date*</label>
                <input
                  className="input_field"
                  type="text"
                  name="date"
                  value={register.date}
                  onChange={onChange}
                  required
                />
              </div>
              {type_of_user === "patient" && (
                <div>
                  <label className="input_label">Price*</label>
                  <input
                    className="input_field"
                    type="text"
                    name="price"
                    value={register.price}
                    onChange={onChange}
                    required
                  />
                </div>
              )}
              <div>
                <label className="input_label">Upload Report*</label>
                <input
                  className="input_field"
                  type="file"
                  name="report"
                  value={register.report}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="input_button">
              Upload
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Report;
