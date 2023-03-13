import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "../../components/Header";
import axios from "axios";

const Report = () => {
  const navigate = useNavigate();
  const { isLogin, setAlert, setLoading } = useContext(StateContext);
  const [cookies] = useCookies(["user_id"]);
  const [type_of_user] = useState(cookies.user_type);
  const [register, setRegister] = useState({
    patient_id: "",
    name: "",
    description: "",
    patient_age: "",
    type: "",
    disease: "",
    criticality: "",
    date: "",
    price: "",
  });
  const [reportFile, setReportFile] = useState({});
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      navigate(-1);
      return;
    }
    if (cookies.user_type !== "patient" && cookies.user_type !== "doctor") {
      navigate(-1);
      return;
    }
  }, [isLogin]);

  useEffect(() => {
    if (type_of_user === "doctor") {
      (async () => {
        setLoading(true);
        try {
          const { data } = await axios.get("/api/patient");
          setPatients(data);
        } catch (error) {
          console.log(error);
          setAlert({
            isAlert: true,
            type: "error",
            message: error.response.data,
          });
        }
        setLoading(false);
      })();
    }
  }, [type_of_user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    setReportFile(files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("patient_id", register.patient_id);
    formData.append("name", register.name);
    formData.append("description", register.description);
    formData.append("patient_age", register.patient_age);
    formData.append("type", register.type);
    formData.append("disease", register.disease);
    formData.append("criticality", register.criticality);
    formData.append("date", register.date);
    formData.append("price", register.price);
    formData.append("report", reportFile);
    try {
      await axios.post(`/api/registration/report/${type_of_user}`, formData);
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
      });
      setReportFile({});
      navigate("/dashboard");
    } catch (error) {
      setAlert({
        isAlert: true,
        type: "error",
        message: error.response.data,
      });
    }
    setLoading(false);
  };
  return (
    <div className="h-full">
      <Header />
      <div className="flex items-center justify-center p-6 bg-gray-50">
        <div className="flex w-full max-w-2xl bg-white rounded-xl shadow-xl border border-gray-200/80">
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
                      list="patient_id_list"
                    />
                    <datalist id="patient_id_list">
                      {patients.map((patient) => {
                        return (
                          <option value={patient._id}>{patient.name}</option>
                        );
                      })}
                    </datalist>
                  </div>
                )}
                <div>
                  <label className="input_label">Report Name*</label>
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
                    name="patient_age"
                    value={register.patient_age}
                    onChange={onChange}
                    required
                  />
                </div>
                <div>
                  <label className="input_label">Type of Report*</label>
                  <select
                    className="input_field"
                    name="type"
                    value={register.type}
                    onChange={onChange}
                    required
                  >
                    <option selected value="">
                      Report Type
                    </option>
                    <option value="pdf">PDF</option>
                    <option value="image">Image</option>
                  </select>
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
                  <select
                    className="input_field"
                    name="criticality"
                    value={register.criticality}
                    onChange={onChange}
                    required
                  >
                    <option selected value="">
                      Criticality Level
                    </option>
                    <option value="high">Hgh</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="input_label">Date*</label>
                  <input
                    className="input_field"
                    type="date"
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
                    onChange={onFileChange}
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
    </div>
  );
};

export default Report;
