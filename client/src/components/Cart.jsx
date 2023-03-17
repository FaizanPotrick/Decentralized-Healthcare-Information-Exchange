import React, { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StateContext } from "../context/StateContext";
import axios from "axios";

const Cart = ({ open, setOpen }) => {
  const [reports, setReports] = useState([]);
  const { setLoading, setAlert } = useContext(StateContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!open) return;
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/cart");
        setReports(data);
        setTotalPrice(
          data.reduce((acc, curr) => {
            return acc + curr.report.price;
          }, 0)
        );
      } catch (err) {
        console.log(err);
        setAlert({
          isAlert: true,
          type: "error",
          message: err.response.data.message,
        });
      }
      setLoading(false);
    })();
  }, [open]);

  const RemoveFromCart = async (id) => {
    setLoading(true);
    try {
      await axios.get(`/api/registration/cart/remove/${id}`);
      setTotalPrice(
        reports
          .filter((report) => report._id !== id)
          .reduce((acc, curr) => {
            return acc + curr.report.price;
          }, 0)
      );
      setReports(reports.filter((report) => report._id !== id));
    } catch (err) {
      console.log(err);
      setAlert({
        isAlert: true,
        type: "error",
        message: err.response.data.message,
      });
    }
    setLoading(false);
  };

  const Purchase = async () => {
    setLoading(true);
    try {
      await axios.get("/api/registration/report/exchange");
      setReports([]);
      setTotalPrice(0);
    } catch (err) {
      console.log(err);
      setAlert({
        isAlert: true,
        type: "error",
        message: err.response.data.message,
      });
    }
    setLoading(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {reports.map((product) => {
                              return (
                                <li key={product._id} className="flex py-4">
                                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-gray-200">
                                    <img
                                      src={
                                        product.report.type == "pdf"
                                          ? "x-ray.png"
                                          : "checkup.png"
                                      }
                                      alt="product"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{product.report.name}</h3>
                                        <p className="ml-4">
                                        ₹{product.report.price}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.patient.name} -{" "}
                                        {product.report.patient_age}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500 uppercase">
                                        {product.report.type}
                                      </p>
                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            RemoveFromCart(product._id)
                                          }
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Exchange and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={Purchase}
                          className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 font-medium text-white shadow hover:bg-indigo-700"
                        >
                          Purchase
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
