import { Dialog, Transition, Menu } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditFilterRequest } from "../redux-saga/Action/CandAction";


export default function ModalFilter({ dataFilter }) {
  let [isOpen, setIsOpen] = useState(false);
  const filterStatus = ["passed", "Recommended","Gailed"];
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      boapEntityId: dataFilter.boapEntityId,
      boapStatus: dataFilter.boapStatus,
      boapReview: dataFilter.boapReview,
      boapTotalSkor: dataFilter.boapTotalSkor
    },
    validationSchema: Yup.object().shape({
      boapEntityId: Yup.number().required(),
      boapReview: Yup.string().required(),
      boapTotalSkor: Yup.string().required(),
      boapStatus: Yup.string()
        .oneOf(filterStatus, "Please select status ")
        .required("Please"),
    }),

    onSubmit: async (values) => {
      dispatch(EditFilterRequest(values));
      closeModal();
    },
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Menu as="div" className="relative flex justify-end items-center">
        {({ open }) => (
          <>
            <Menu.Button
              className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-600
             rounded-full hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 
             focus:ring-orange-500 "
              onClick={openModal}
            >
              <span className="sr-only">Open options</span>
              <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
            </Menu.Button>
          </>
        )}
      </Menu>
      {/* <div>
        <button
          type="button"
          onClick={openModal}
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-500 focus:ring-4 
          focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center  dark:border-blue-400 
          dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-900"
        >
          Edit
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Switch Status
                  </Dialog.Title>
                  <form onSubmit={formik.handleSubmit}>
                  <div className="py-6 px-6 lg:px-8">
                    <div>
                      Kandidat : {dataFilter.boapEntity.userFirstName}{" "}
                      {dataFilter.boapEntity.userLastName}{" "}
                    </div>
                    <br></br>
                    <div>
                      Score Filtering Test :{" "}
                      <input
                        className="font-xs bg-gray-50 border border-gray-300"
                        id="grid-city"
                        name="boapTotalSkor"
                        type="text"
                        // value={dataFilter.boapTotalSkor}
                        value={
                          dataFilter.boapTotalSkor
                            ? dataFilter.boapTotalSkor
                            : "Please insert score"
                        }
                      />
                    </div>
                    <div></div>
                    <br></br>
                    <div>
                      Status :{" "}
                      <select name="boapStatus"
                      onChange={(e) =>
                        formik.setFieldValue("boapStatus", e.target.value)
                      }
                      className="select max-w font-xs bg-gray-50 border border-gray-300">
                        <option value={"Passed"}
                          selected={
                            dataFilter.boapTotalSkor >= 50 ? "true" : "false"
                          }
                        >
                          Passed
                        </option>
                        <option value={"Recommended"}
                          selected={
                            dataFilter.boapTotalSkor === 25 && 50 ? "true" : "false"
                          }
                        >
                          Recommended
                        </option>
                        <option value={"Failed"}
                          selected={
                            dataFilter.boapTotalSkor < 25 ? "true" : "false"
                          }
                        >
                          Failed
                        </option>
                      </select>
                    </div>
                    <br></br>
                    <div>
                      Review :
                      <textarea
                        id="review"
                        name="boapReview"
                        rows={4}
                        className=" w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Kandidat direkomendasikan"
                        value={dataFilter.boapReview}
                      />
                    </div>
                  </div>

                  <div className="mt-10 flex gap-2 justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // onClick={closeModal}
                    >
                      Submit
                    </button>
                  </div>
                  </form>
                </Dialog.Panel>
                
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
