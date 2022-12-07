import { Dialog, Transition, Menu } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { EditApplyRequest } from "../redux-saga/Action/CandAction";

export default function ModalApply({ dataApply }) {
  let [isOpen, setIsOpen] = useState(false);
  const applyStatus = ["Ready Test", "Not Responding"];

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      boapEntityId: dataApply.boapEntityId,
      boapStatus: dataApply.boapStatus,
    },
    validationSchema: Yup.object().shape({
      boapEntityId: Yup.number().required(),
      boapStatus: Yup.string()
        .oneOf(applyStatus, "Please select status ")
        .required("Please"),
    }),

    onSubmit: async (values) => {
      dispatch(EditApplyRequest(values));
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
                        Kandidat : {dataApply.boapEntity.userFirstName}{" "}
                        {dataApply.boapEntity.userLastName}{" "}
                      </div>
                      <br></br>
                      <div>
                        Set status :{" "}
                        <select
                          name="boapStatus"
                          onChange={(e) =>
                            formik.setFieldValue("boapStatus", e.target.value)
                          }
                          className="select max-w-xs font-xs border border-gray-300"
                        >
                          <option value={"Ready Test"}>Ready Test</option>
                          <option value={"Not Responding"}>
                            Not Responding
                          </option>
                        </select>
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
                        //onClick={formik.handleSubmit}
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
