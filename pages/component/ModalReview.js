// import { Dialog, Transition, Menu } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { DotsVerticalIcon } from "@heroicons/react/solid";
// import { useFormik } from "formik";
// import { EditFilterRequest, GetFilterRequest } from "../../redux-saga/Action/CandAction";

// export default function ModalReview({ filter }) {
//   let [isOpen, setIsOpen] = useState(false);

//   const dispatch = useDispatch();
//   const handleGetFilter = useSelector((state) => state.candidateStated.filters);
//   //const { filter } = useSelector(state => state.candidateStated)
//   useEffect(() => {
//     dispatch(GetFilterRequest(handleGetFilter))
// }, [dispatch, handleGetFilter])

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//         boapEntityId: filter.boapEntityId,
//         boapReview: filter.boapReview,
//         boapStatus: filter.boapStatus,
//         boapTotalSkor: filter.boapTotalSkor
//     },
//     onSubmit: async (values) => {
//         let payload = new FormData();
//         payload.append('boapReview', values.boapReview)
//         payload.append('boapEntityId', values.boapEntityId)
//         payload.append('boapStatus', values.boapStatus)
//         payload.append('boapTotalSkor', values.boapTotalSkor)

//         dispatch(EditFilterRequest(payload))
//         //props.closeAdd();
//         window.alert('Data Successfully Updated')
//         //props.onRefresh();
//     }
// })

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   return (
//     <>
//       <div>
//         <Menu as="div" className="relative flex justify-end items-center">
//           {({ open }) => (
//             <>
//               <Menu.Button
//                 className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-600
//              rounded-full hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 
//              focus:ring-orange-500 "
//                 onClick={openModal}
//               >
//                 <span className="sr-only">Open options</span>
//                 <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
//               </Menu.Button>
//             </>
//           )}
//         </Menu>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Switch Status
//                   </Dialog.Title>

//                   <div
//                     className="py-6 px-6 lg:px-8"
//                   >
//                     <div>
//                       Kandidat : {filter.boapEntity.userFirstName}{" "}
//                       {filter.boapEntity.userLastName}{" "}
//                     </div>
//                     <br></br>
//                     <div className="w-full  ">
//                       Score Filtering Test :{" "}
//                       <input
//                         className=" bg-gray-50 text-gray-700 border border-gray-100  py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                         id="grid-city"
//                         type="text"
//                         value={formik.values.boapTotalSkor}
//                         // value={
//                         //   filter.boapTotalSkor
//                         //     ? filter.boapTotalSkor
//                         //     : "Please insert score"
//                         // }
//                       />
//                     </div>
//                     <div></div>
//                     <br></br>
//                     <div>
//                       Status :{" "}
//                       <select
//                         className="select max-w font-xs bg-gray-50 border border-gray-300"
//                         value={formik.values.boapStatus}
//                       >
//                         <option
//                           selected={
//                             formik.values.boapTotalSkor >= 50 ? "true" : "false"
//                           }
//                         >
//                           Passed
//                         </option>
//                         <option
//                           selected={
//                             formik.values.boapTotalSkor === 25 && 50 ? "true" : "false"
//                           }
//                         >
//                           Recommended
//                         </option>
//                         <option
//                           selected={
//                             formik.values.boapTotalSkor < 25 ? "true" : "false"
//                           }
//                         >
//                           Failed
//                         </option>
//                       </select>
//                     </div>
//                     <br></br>
//                     <div>
//                       Review :
//                       <textarea
//                         id="review"
//                         rows={4}
//                         className=" w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Kandidat direkomendasikan"
//                         value={formik.values.boapReview}
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-10 flex gap-2 justify-center">
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={closeModal}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={formik.handleSubmit}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }
