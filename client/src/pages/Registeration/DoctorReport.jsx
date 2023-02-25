import React from "react";
import "../App.css";
const DoctorReport = () => {
  return (
    <div>
      <div className="flex flex-col items-center  pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-3xl font-bold text-green-800">
              Doctor Report Form
            </h3>
          </a>
        </div>

        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-start text-gray-700 undefined "
              >
                Patient Username
              </label>
              <div className="flex flex-col  items-start">
                <input
                  type="text"
                  name="name"
                  className="block w-full mt-1 border border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div>
              <label class="block">
                <span class="sr-only">Choose file</span>
                <input
                  type="file"
                  class="block w-full text-sm text-slate-500 py-2 
                         file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-green-800 hover:file:bg-violet-100 "
                />
              </label>
            </div>

            <div className="flex flex-col ">
              <div class=" w-full flex flex-col items-start  text-left">
                <label className="block text-sm font-medium text-gray-700 undefined">
                  {" "}
                  Medical Report Type
                </label>

                <div class=" p-2 flex flex-col ">
                  <div class="dropdown inline-block relative ">
                    <button class="  bg-violet-50 text-green-800 font-semibold py-2 px-4 rounded inline-flex items-center">
                      <span class="mr-1">Select</span>
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                      </svg>
                    </button>
                    <ul class="dropdown-menu absolute hidden text-gray-500 pt-1">
                      <li class="">
                        <a
                          class="rounded-t bg-violet-100 hover:bg-violet-50 py-2 px-4 block whitespace-no-wrap"
                          href="#"
                        >
                          X-ray
                        </a>
                      </li>
                      <li class="">
                        <a
                          class="bg-violet-100 hover:bg-violet-50  py-2 px-4 block whitespace-no-wrap"
                          href="#"
                        >
                          MRI
                        </a>
                      </li>
                      <li class="">
                        <a
                          class="rounded-b bg-violet-100 hover:bg-violet-50  py-2 px-4 block whitespace-no-wrap"
                          href="#"
                        >
                          Blood Test
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* OVERLAPPING */}

            <div class="flex flex-col items-start  text-left">
              <label className="block text-sm font-medium text-gray-700 undefined">
                {" "}
                Patient Age
              </label>

              <div class=" p-2 flex flex-col ">
                <div class="dropdown inline-block relative ">
                  <button class=" bg-violet-50 text-green-800 font-semibold py-2 px-4 rounded inline-flex items-center">
                    <span class="mr-1">Select</span>
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                    </svg>
                  </button>
                  <ul class="dropdown-menu absolute hidden text-gray-500 pt-1">
                    <li class="">
                      <a
                        class="rounded-t bg-violet-100 hover:bg-violet-50 py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        0-5
                      </a>
                    </li>
                    <li class="">
                      <a
                        class="bg-violet-100 hover:bg-violet-50  py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        5-10
                      </a>
                    </li>
                    <li class="">
                      <a
                        class="rounded-b bg-violet-100 hover:bg-violet-50  py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        11-15
                      </a>
                    </li>

                    <li class="">
                      <a
                        class="rounded-b bg-violet-100 hover:bg-violet-50  py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        16-20
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-start  text-left">
              <label className="block text-sm font-medium text-gray-700 undefined">
                {" "}
                Disease Name
              </label>

              <div class=" p-2 flex flex-col ">
                <div class="dropdown inline-block relative ">
                  <button class=" bg-violet-50 text-green-800 font-semibold py-2 px-4 rounded inline-flex items-center">
                    <span class="mr-1">Select</span>
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                    </svg>
                  </button>
                  <ul class="dropdown-menu absolute hidden text-gray-500 pt-1">
                    <li class="">
                      <a
                        class="rounded-t bg-violet-100 hover:bg-violet-50 py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        Cancer
                      </a>
                    </li>
                    <li class="">
                      <a
                        class="bg-violet-100 hover:bg-violet-50  py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        Cholera
                      </a>
                    </li>
                    <li class="">
                      <a
                        class="rounded-b bg-violet-100 hover:bg-violet-50  py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        Typhoid
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm  text-start font-medium text-gray-700 undefined"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="2"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              ></textarea>
            </div>

            <div class="flex flex-col items-start  text-left p-2">
              <label className="block text-sm font-medium text-gray-700 undefined">
                {" "}
                Criticality
              </label>

              <div class=" p-2 flex flex-col ">
                <div class="dropdown inline-block relative ">
                  <button class=" bg-violet-50 text-green-800 font-semibold py-2 px-4 rounded inline-flex items-center">
                    <span class="mr-1">Select</span>
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                    </svg>
                  </button>
                  <ul class="dropdown-menu absolute hidden text-gray-500 pt-1">
                    <li class="">
                      <a
                        class="rounded-t bg-violet-100 hover:bg-violet-50 py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        High
                      </a>
                    </li>
                    <li class="">
                      <a
                        class="bg-violet-100 hover:bg-violet-50  py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        Medium
                      </a>
                    </li>
                    <li class="">
                      <a
                        class="rounded-b bg-violet-100 hover:bg-violet-50  py-2 px-4 block whitespace-no-wrap"
                        href="#"
                      >
                        Low
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  rounded-md bg-[#0e8f66]/80 focus:outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorReport;
