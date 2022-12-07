/* eslint-disable react/jsx-no-undef */
import AppLayout from "../../component/layout/AppLayout";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetApplyRequest } from "../../redux-saga/Action/CandAction";
import { GetFilterRequest } from "../../redux-saga/Action/CandAction";
import { GetContractRequest } from "../../redux-saga/Action/CandAction";
import { GetDisqualifiedRequest } from "../../redux-saga/Action/CandAction";
import { GetNotrespondRequest } from "../../redux-saga/Action/CandAction";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/solid";
import Modal from "../../component/ModalReview";
import ModalReview from "../../component/ModalReview";
import ModalFilter from "../../component/ModalFilter";
import ModalApply from "../../component/ModalApply";
import ModalContract from "../../component/ModalContract";
import ModalDisqualified from "../../component/ModalDisqualified";
import ModalNotRespond from "../../component/ModalNotRespond";


const columns = [
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Candidate() {
  const [categories] = useState({
    Apply: [],
    "Filtering Test": [],
    Contract: [],
    Disqualified: [],
    "Not Responding": [],
  });

  const dispatch = useDispatch();

  const [candidates, setCandidates] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(0);
  const [display, setDisplay] = useState(false);
  const [filter, setFilter] = useState({
    input: "",
  });

  const handleGetApply = useSelector(
    (state) => state.candidateStated.applies
  );

  useEffect(() => {
    dispatch(GetApplyRequest());
    console.log(handleGetApply);
  }, []);

  const handleGetFilter = useSelector(
    (state) => state.candidateStated.filters
  );

  useEffect(() => {
    dispatch(GetFilterRequest());
    console.log(handleGetFilter);
  }, []);

  const handleGetContract = useSelector(
    (state) => state.candidateStated.contracts
  );

  useEffect(() => {
    dispatch(GetContractRequest());
    console.log(handleGetContract);
  }, []);

  const handleGetDisqualified = useSelector(
    (state) => state.candidateStated.disqualifieds
  );

  useEffect(() => {
    dispatch(GetDisqualifiedRequest());
    console.log(handleGetDisqualified);
  }, []);

  const handleGetNotrespond = useSelector(
    (state) => state.candidateStated.notresponds
  );

  useEffect(() => {
    dispatch(GetNotrespondRequest());
    console.log(handleGetNotrespond);
  }, []);


  useEffect(() => {
    setPageNumbers(
      Array.from({ length: Math.ceil(handleGetApply.length / 5) }, (v, i) =>
        i + 1 === 1
          ? { number: i + 1, active: true }
          : { number: i + 1, active: false }
      )
    );
    setCurrentPage(1);
    setPageRange(0);
  }, [handleGetApply]);

  const onClick = (id) => {
    setDisplayEdit(true);
    setId(id);
  };

  return (
    <AppLayout>
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Candidates
          </h1>
        </div>
      </div>
      <div className="w-full max-w px-2 py-0 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1  bg-gray-100 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-grey-300",
                    //'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-grey-300',
                    selected
                      ? "bg-white shadow"
                      : "text-grey-800 hover:bg-white/[0.12] hover:text-purple-700"
                  )
                }
              >
                {category}
              </Tab>
            ))}
            <select className="select flex rounded-lg max-w-xs px-8 py-0.5 text-xs ">
              <option disabled selected>
                Filter by Month
              </option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <select className="select flex rounded-lg max-w-xs px-8 py-0.5 text-xs">
              <option disabled selected>
                Year
              </option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
            </select>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <table className="min-w-full">
                <thead>
                  <tr key="col_names">
                    {(columns || []).map((column) => (
                      // eslint-disable-next-line react/jsx-key
                      <th className="px-6 py-4 bg-white text-center text-xs font-medium text-gray-900 uppercase">
                        <span className="">{column.name}</span>
                      </th>
                    ))}
                    <th className="px-6 py-3 bg-white text-left text-xs font-medium text-gray-900 uppercase tracking-wider" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {Array.isArray(handleGetApply) &&
                    handleGetApply
                      .slice((currentPage - 1) * 10, currentPage * 10)
                      .map((apply) => (
                        <>
                          <tr key={apply.boapEntityId}>
                            <td className=" text-center whitespace-nowrap text-sm text-gray-900">
                              <img
                                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                src="../assets/images/yuri.jpg"
                                alt=""
                              />
                            </td>
                            <td className="px-4 py-5 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                {apply.boapEntity.userFirstName}{" "}
                                {apply.boapEntity.userLastName}
                              </div>

                              <div className="font-style: italic">
                                {apply.boapEntity.usersEmail[0].pmailAddress}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                {/*{apply.boapEntity.usersEducations[0].usduSchool}*/}
                                {apply.boapEntity.usersEducations[0] ? apply.boapEntity.usersEducations[0].usduSchool : 'No school inserted'} 
                              </div>
                              <div className="font-style: italic">
                              {apply.boapEntity.usersEducations[0] ? apply.boapEntity.usersEducations[0].usduFieldStudy : 'No major inserted'}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              Lulus :{" "}
                              {/* {
                            apply.boapEntity.usersEducations[0].usduEndDate} */}
                              {apply.boapEntity.usersEducations[0] ? new Date(
                                 apply.boapEntity.usersEducations[0].usduEndDate 
                              ).getFullYear() : '-'}
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              HP : 0{apply.boapEntity.usersPhones.uspoNumber}
                            </td>
                            <td className=" py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              {apply.boapProg.progTitle}
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                Applied on{" "}
                                {apply.boapProg.progId.boapModifiedDate}
                                <br></br>
                              </div>
                              <div className="font-style: italic">
                                {apply.boapStatus}
                              </div>
                            </td>

                            {/*Option*/}
                            <td className="pr-6">
                              <ModalApply dataApply={apply}/> 
                            </td>
                          </tr>
                        </>
                      ))}
                </tbody>
              </table>
            </Tab.Panel>
            <Tab.Panel>
              <table className="min-w-full">
                <thead>
                  <tr key="col_names">
                    {(columns || []).map((column) => (
                      // eslint-disable-next-line react/jsx-key
                      <th className="px-6 py-4 bg-white text-center text-xs font-medium text-gray-900 uppercase">
                        <span className="">{column.name}</span>
                      </th>
                    ))}
                    <th className="px-6 py-3 bg-white text-left text-xs font-medium text-gray-900 uppercase tracking-wider" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {Array.isArray(handleGetFilter) &&
                    handleGetFilter
                      .slice((currentPage - 1) * 10, currentPage * 10)
                      .map((filter) => (
                        <>
                          <tr key={filter.boapEntityId}>
                            <td className=" text-center whitespace-nowrap text-sm text-gray-900">
                              <img
                                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                src="../assets/images/yuri.jpg"
                                alt=""
                              />
                            </td>
                            <td className="px-4 py-5 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                {filter.boapEntity.userFirstName}{" "}
                                {filter.boapEntity.userLastName}
                              </div>

                              <div className="font-style: italic">
                                {filter.boapEntity.usersEmail[0].pmailAddress}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                              {filter.boapEntity.usersEducations[0] ? filter.boapEntity.usersEducations[0].usduSchool : 'No school inserted'}
                              </div>
                              <div className="font-style: italic">
                              {filter.boapEntity.usersEducations[0] ? filter.boapEntity.usersEducations[0].usduFieldStudy : 'No major inserted'}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              Lulus :{" "}
                              {/* {
                            apply.boapEntity.usersEducations[0].usduEndDate} */}
                              {/* {new Date(
                                 filter.boapEntity.usersEducations[0].usduEndDate 
                              ).getFullYear()} */}
                              {filter.boapEntity.usersEducations[0] ? new Date(
                                 filter.boapEntity.usersEducations[0].usduEndDate 
                              ).getFullYear() : '-'}
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              HP : 0{filter.boapEntity.usersPhones.uspoNumber}
                            </td>
                            <td className=" py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              {filter.boapProg.progTitle}
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                Applied on{" "}
                                {filter.boapProg.progId.boapModifiedDate}
                                <br></br>
                              </div>
                              <div className="font-style: italic">
                                {filter.boapStatus}
                              </div>
                            </td>

                            {/*Option*/}
                            <td className="pr-6">
                               <ModalFilter dataFilter={filter}/>
                            </td>
                          </tr>
                        </>
                      ))}
                </tbody>
              </table>
            </Tab.Panel>
            <Tab.Panel>
              <table className="min-w-full">
                <thead>
                  <tr key="col_names">
                    {(columns || []).map((column) => (
                      // eslint-disable-next-line react/jsx-key
                      <th className="px-6 py-4 bg-white text-center text-xs font-medium text-gray-900 uppercase">
                        <span className="">{column.name}</span>
                      </th>
                    ))}
                    <th className="px-6 py-3 bg-white text-left text-xs font-medium text-gray-900 uppercase tracking-wider" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {Array.isArray(handleGetContract) &&
                    handleGetContract
                      .slice((currentPage - 1) * 10, currentPage * 10)
                      .map((contract) => (
                        <>
                          <tr key={contract.boapEntityId}>
                            <td className=" text-center whitespace-nowrap text-sm text-gray-900">
                              <img
                                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                src="../assets/images/yuri.jpg"
                                alt=""
                              />
                            </td>
                            <td className="px-4 py-5 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                {contract.boapEntity.userFirstName}{" "}
                                {contract.boapEntity.userLastName}
                              </div>

                              <div className="font-style: italic">
                                {contract.boapEntity.usersEmail[0].pmailAddress}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>                               
                                {contract.boapEntity.usersEducations[0] ? contract.boapEntity.usersEducations[0].usduSchool : 'No school inserted'} 
                              </div>
                              <div className="font-style: italic">
                              {contract.boapEntity.usersEducations[0] ? contract.boapEntity.usersEducations[0].usduFieldStudy : 'No major inserted'}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              Lulus :{" "}                            
                              {contract.boapEntity.usersEducations[0] ? new Date(
                                 contract.boapEntity.usersEducations[0].usduEndDate 
                              ).getFullYear() : '-'}
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              HP : 0{contract.boapEntity.usersPhones.uspoNumber}
                            </td>
                            <td className=" py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              {contract.boapProg.progTitle}
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                Applied on{" "}
                                {contract.boapProg.progId.boapModifiedDate}
                                <br></br>
                              </div>
                              <div className="font-style: italic">
                                Score : {contract.boapTotalSkor}, {contract.boapStatus}
                              </div>
                            </td>

                            {/*Option*/}
                            <td className="pr-6">
                            <ModalContract dataContract={contract}/> 
                            </td>
                          </tr>
                        </>
                      ))}
                </tbody>
              </table>
            </Tab.Panel>
            <Tab.Panel>
              <table className="min-w-full">
                <thead>
                  <tr key="col_names">
                    {(columns || []).map((column) => (
                      // eslint-disable-next-line react/jsx-key
                      <th className="px-6 py-4 bg-white text-center text-xs font-medium text-gray-900 uppercase">
                        <span className="">{column.name}</span>
                      </th>
                    ))}
                    <th className="px-6 py-3 bg-white text-left text-xs font-medium text-gray-900 uppercase tracking-wider" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {Array.isArray(handleGetDisqualified) &&
                    handleGetDisqualified
                      .slice((currentPage - 1) * 10, currentPage * 10)
                      .map((disq) => (
                        <>
                          <tr key={disq.boapEntityId}>
                            <td className=" text-center whitespace-nowrap text-sm text-gray-900">
                              <img
                                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                src="../assets/images/yuri.jpg"
                                alt=""
                              />
                            </td>
                            <td className="px-4 py-5 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                {disq.boapEntity.userFirstName}{" "}
                                {disq.boapEntity.userLastName}
                              </div>

                              <div className="font-style: italic">
                                {disq.boapEntity.usersEmail[0].pmailAddress}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>                               
                                {disq.boapEntity.usersEducations[0] ? disq.boapEntity.usersEducations[0].usduSchool : 'No school inserted'} 
                              </div>
                              <div className="font-style: italic">
                              {disq.boapEntity.usersEducations[0] ? disq.boapEntity.usersEducations[0].usduFieldStudy : 'No major inserted'}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              Lulus :{" "}                             
                              {disq.boapEntity.usersEducations[0] ? new Date(
                                disq.boapEntity.usersEducations[0].usduEndDate 
                              ).getFullYear() : '-'}
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              HP : 0{disq.boapEntity.usersPhones.uspoNumber}
                            </td>
                            <td className=" py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              {disq.boapProg.progTitle}
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                Applied on{" "}
                                {disq.boapProg.progId.boapModifiedDate}
                                <br></br>
                              </div>
                              <div className="font-style: italic">
                              Score : {disq.boapTotalSkor}, {disq.boapStatus}
                              </div>
                            </td>

                            {/*Option*/}
                            <td className="pr-6">
                            <ModalDisqualified dataDisq={disq}/> 
                            </td>
                          </tr>
                        </>
                      ))}
                </tbody>
              </table>
            </Tab.Panel>
            <Tab.Panel>
              <table className="min-w-full">
                <thead>
                  <tr key="col_names">
                    {(columns || []).map((column) => (
                      // eslint-disable-next-line react/jsx-key
                      <th className="px-6 py-4 bg-white text-center text-xs font-medium text-gray-900 uppercase">
                        <span className="">{column.name}</span>
                      </th>
                    ))}
                    <th className="px-6 py-3 bg-white text-left text-xs font-medium text-gray-900 uppercase tracking-wider" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {Array.isArray(handleGetNotrespond) &&
                    handleGetNotrespond
                      .slice((currentPage - 1) * 10, currentPage * 10)
                      .map((not) => (
                        <>
                          <tr key={not.boapEntityId}>
                            <td className=" text-center whitespace-nowrap text-sm text-gray-900">
                              <img
                                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                src="../assets/images/yuri.jpg"
                                alt=""
                              />
                            </td>
                            <td className="px-4 py-5 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                {not.boapEntity.userFirstName}{" "}
                                {not.boapEntity.userLastName}
                              </div>

                              <div className="font-style: italic">
                                {not.boapEntity.usersEmail[0].pmailAddress}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                             
                                {not.boapEntity.usersEducations[0] ? not.boapEntity.usersEducations[0].usduSchool : 'No school inserted'} 
                              </div>
                              <div className="font-style: italic">
                              {not.boapEntity.usersEducations[0] ? not.boapEntity.usersEducations[0].usduFieldStudy : 'No major inserted'}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              Lulus :{" "}
     
                              {not.boapEntity.usersEducations[0] ? new Date(
                                 not.boapEntity.usersEducations[0].usduEndDate 
                              ).getFullYear() : '-'}
                            </td>
                            <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              HP : 0{not.boapEntity.usersPhones.uspoNumber}
                            </td>
                            <td className=" py-2 text-center whitespace-nowrap text-sm text-gray-900">
                              {not.boapProg.progTitle}
                            </td>
                            <td className="px-4 py-2 text-left whitespace-nowrap text-sm text-gray-900">
                              <div>
                                Applied on{" "}
                                {not.boapProg.progId.boapModifiedDate}
                                <br></br>
                              </div>
                              <div className="font-style: italic">
                                {not.boapStatus}
                              </div>
                            </td>

                            {/*Option*/}
                            <td className="pr-6">
                            <ModalNotRespond dataNot={not}/> 
                            </td>
                          </tr>
                        </>
                      ))}
                </tbody>
              </table>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div className="sm:block">
        <div className="align-middle inline-block min-w-full border-b border-gray-200 ">
          {handleGetApply.length === 0 && (
            <div className="px-6 py-3 text-center whitespace-nowrap text-sm font-medium text-gray-900">
              {" "}
              Data Not Found...
            </div>
          )}

          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
              <br></br>
              <br></br>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => {
                      setCurrentPage(1);
                      setPageNumbers(
                        [...pageNumbers].map((val) =>
                          val.number === 1
                            ? { ...val, active: true }
                            : { ...val, active: false }
                        )
                      );
                      setPageRange(0);
                    }}
                    className="relative inline-flex items-center px-3 py-2 font-medium text-gray-600 hover:text-orange-600"
                  >
                    <span className="underline">First</span>
                  </button>
                  <button
                    onClick={() => {
                      const min = 0;
                      if (pageRange > min) {
                        setPageRange(pageRange - 1);
                      }
                    }}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

                  {pageNumbers
                    .slice(pageRange * 4, pageRange * 4 + 4)
                    .map((el) => (
                      // eslint-disable-next-line react/jsx-key
                      <button
                        onClick={() => {
                          setCurrentPage(el.number);
                          setPageNumbers(
                            [...pageNumbers].map((val) =>
                              val.number === el.number
                                ? { ...val, active: true }
                                : { ...val, active: false }
                            )
                          );
                        }}
                        aria-current="page"
                        className={classNames(
                          el.active
                            ? "z-20 bg-orange-100 border-orange-600 text-orange-900"
                            : "z-10 bg-white border-gray-300 text-gray-600",
                          "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        )}
                      >
                        {el.number}
                      </button>
                    ))}
                  <button
                    onClick={() => {
                      const max = Math.ceil(pageNumbers.length / 4) - 1;
                      if (pageRange < max) {
                        setPageRange(pageRange + 1);
                      }
                    }}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => {
                      const max = Math.ceil(pageNumbers.length / 4) - 1;
                      setCurrentPage(pageNumbers.length);
                      setPageNumbers(
                        [...pageNumbers].map((val) =>
                          val.number === pageNumbers.length
                            ? { ...val, active: true }
                            : { ...val, active: false }
                        )
                      );
                      setPageRange(max);
                    }}
                    className="relative inline-flex items-center px-3 py-2 font-medium text-gray-600 hover:text-orange-600"
                  >
                    <span className="underline">Last</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-30">
        <ToastContainer autoClose={2000} />
      </div>
    </AppLayout>
  );
}
