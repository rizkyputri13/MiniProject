/* eslint-disable react/jsx-no-undef */
import Page from "../../component/commons/Page";
import AppLayout from "../../component/layout/AppLayout";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  GetBatchRequest,
  EditBatchRequest,
  DeleteBatchRequest,
} from "../../redux-saga/Action/BatchAction";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import React, { Fragment } from "react";
import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/solid";

const columns = [
  { name: "BATCH" },
  { name: "TECHNOLOGY" },
  { name: "MEMBERS" },
  { name: "PERIODE" },
  { name: "TRAINER" },
  { name: "STATUS" },
  //{ name: "ACTION" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Batch() {
  const dispatch = useDispatch();
  const [batchs, setBatchs] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(0);
  const [display, setDisplay] = useState(false);
  const [filter, setFilter] = useState({
    input: "",
  });

  const handleGetBatch = useSelector((state) => state.batchStated.batchs);
  const handleEditBatch = useSelector((state) => state.batchStated.batchs);
  //const handleDeleteBatch = useSelector((state) => state.batchStated.batchs);

  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");
  const [viewKeyword, setViewKeyword] = useState("");
  const [category, setCategory] = useState("1");

  const handleSearch = () => {
    setSearchTerm(keyword);
    setCategoryTerm(category);
  };

  const filteredBatchs = useMemo(() => {
    if (categoryTerm.length > 0 || searchTerm.length > 0) {
      //setCurrentPage(1);
      setViewKeyword(searchTerm);
      return handleGetBatch.filter((data) => {
        return (
          (data.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.batchProg.progTitle
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          categoryTerm.includes(data.batchId)
        );
      });
    }
    return handleGetBatch;
  }, [searchTerm, categoryTerm, handleGetBatch]);

  useEffect(() => {
    dispatch(GetBatchRequest());
    console.log(handleGetBatch);
  }, [dispatch, handleGetBatch]);

  useEffect(() => {
    dispatch(EditBatchRequest());
    console.log(handleEditBatch);
  }, [dispatch, handleEditBatch]);

  // useEffect(() => {
  //   dispatch(DeleteBatchRequest());
  //   console.log(handleDeleteBatch);
  // }, [dispatch, handleDeleteBatch]);

  useEffect(() => {
    setPageNumbers(
      Array.from({ length: Math.ceil(handleGetBatch.length / 5) }, (v, i) =>
        i + 1 === 1
          ? { number: i + 1, active: true }
          : { number: i + 1, active: false }
      )
    );
    setCurrentPage(1);
    setPageRange(0);
  }, [handleGetBatch]);

  const onDelete = async (id) => {
    dispatch(DeleteBatchRequest(id));
    //toast.success('Data has been deleted.')
  };

  const onClick = (id) => {
    setDisplayEdit(true);
    setId(id);
  };

  return (
    <AppLayout>
      <Page
        name={"Batch"}
        setDisplay={setDisplay}
        title="Batch"
        titleButton="Create"
        onClick={() => navigate("/app/batch/")}
      >
        <div className=" flex justify-center">
          <div className="w-full">
            <div className="input-group relative flex justify-center items-stretch w-full mb-10">
              <p className="text-sm mx-2 py-1">Search by category</p>
              <input
                type="search"
                className="form-control relative w-48 block px-2 py-0.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-transparent focus:text-gray-700 focus:ring-1 focus:ring-offset-1 focus:ring-purple-500 focus:outline-none"
                placeholder="batch, technology, trainer"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <select
                className="flex rounded max-w-xs px-8 py-0.5 text-xs "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled selected>
                  Status
                </option>
                <option>New</option>
                <option>Running</option>
                <option>Closed</option>

                {/* {batchs.map((data) => (
                  <option key={data.batchId} value={data.batchId}>
                    {data.batchStatus}
                  </option>
                ))} */}
              </select>
              <button
                type="submit"
                onClick={handleSearch}
                className="btn px-3 py-2 bg-orange-600 text-white text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-purple-500 transition duration-150 ease-in-out flex items-center"
              >
                {" "}
                Search
                {/* <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="w-3"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg> */}
              </button>
            </div>
          </div>
        </div>
        <div className="sm:block">
          <div className="align-middle inline-block min-w-full border-b border-gray-200 ">
            <table className="min-w-full">
              <thead className="border-y border-gray-200">
                <tr key="col_names">
                  {(columns || []).map((column) => (
                    // eslint-disable-next-line react/jsx-key
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-900 uppercase">
                      <span className="">{column.name}</span>
                    </th>
                  ))}
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-900 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
              {/* {filteredBatchs.map && filteredBatchs.length > 0 ? (
                  filteredBatchs.map((data) => */}
                {Array.isArray(filteredBatchs) &&
                  filteredBatchs
                    .slice((currentPage - 1) * 5, currentPage * 5)
                    .map((data) => (
                      <>
                        <tr key={data.batchId}>
                          <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                            {data.batchName}
                          </td>
                          <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                            {data.batchProg.progTitle}
                          </td>
                          <td className="px-6 py-2 text-end whitespace-nowrap text-sm text-gray-900">
                            <div>
                              <img
                                className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                                src="../assets/images/yuri.jpg"
                                alt=""
                              />

                              {/* {data.batchProg.progTotalStudent} + */}
                            </div>
                          </td>
                          <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                            {data.batchStartDate}
                            <br></br>
                            {data.batchEndDate}
                          </td>
                          <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                            {data.batchInstructor.empEntity.userFirstName}{" "}
                            {data.batchInstructor.empEntity.userLastName}
                          </td>
                          <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-900">
                            {data.batchStatus}
                          </td>

                          {/*Option*/}
                          <td className="pr-6">
                            <Menu
                              as="div"
                              className="relative flex justify-end items-center"
                            >
                              {({ open }) => (
                                <>
                                  <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-600 rounded-full hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ">
                                    <span className="sr-only">
                                      Open options
                                    </span>
                                    <DotsVerticalIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      static
                                      className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-gray-100 ring-1 ring-gray-900 ring-opacity-5 divide-y divide-gray-300 focus:outline-none"
                                    >
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <Link
                                              href={`/app/batch/edit/${data.batchId}`}
                                              onClick={() =>
                                                onClick(data.batchId)
                                              }
                                              className={classNames(
                                                active
                                                  ? "bg-gray-300 text-gray-700"
                                                  : "text-gray-900",
                                                "group flex items-center px-4 py-2 text-sm"
                                              )}
                                            >
                                              {/* <PencilAltIcon
                                                className="mr-3 h-5 w-5 text-gray-700 group-hover:text-gray-500"
                                                aria-hidden="true"
                                              /> */}
                                              Edit
                                            </Link>
                                          )}
                                        </Menu.Item>
                                      </div>
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <Link
                                              href={`/app/batch/close/${data.batchId}`}
                                              onClick={() => {
                                                if (
                                                  window.confirm(
                                                    "Close this Batch?"
                                                  )
                                                )
                                                  onDelete(data.batchId);
                                              }}
                                              className={classNames(
                                                active
                                                  ? "bg-gray-300 text-gray-700"
                                                  : "text-gray-900",
                                                "group flex items-center px-4 py-2 text-sm"
                                              )}
                                            >
                                              Close Batch
                                            </Link>
                                          )}
                                        </Menu.Item>
                                      </div>
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <Link
                                              href="#"
                                              onClick={() => {
                                                if (
                                                  window.confirm(
                                                    "Delete this Batch?"
                                                  )
                                                )
                                                  onDelete(data.batchId);
                                              }}
                                              className={classNames(
                                                active
                                                  ? "bg-gray-300 text-gray-700"
                                                  : "text-gray-900",
                                                "group flex items-center px-4 py-2 text-sm"
                                              )}
                                            >
                                              Delete Batch
                                            </Link>
                                          )}
                                        </Menu.Item>
                                      </div>
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <Link
                                              href={`/app/batch/set/${data.batchId}`}
                                              onClick={() =>
                                                onClick(data.batchId)
                                              }
                                              className={classNames(
                                                active
                                                  ? "bg-gray-300 text-gray-700"
                                                  : "text-gray-900",
                                                "group flex items-center px-4 py-2 text-sm"
                                              )}
                                            >
                                              {/* <PencilAltIcon
                                                className="mr-3 h-5 w-5 text-gray-700 group-hover:text-gray-500"
                                                aria-hidden="true"
                                              /> */}
                                              Set to Running
                                            </Link>
                                          )}
                                        </Menu.Item>
                                      </div>
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <Link
                                              href={`/app/batch/evaluation/${data.batchId}`}
                                              onClick={() =>
                                                onClick(data.batchId)
                                              }
                                              className={classNames(
                                                active
                                                  ? "bg-gray-300 text-gray-700"
                                                  : "text-gray-900",
                                                "group flex items-center px-4 py-2 text-sm"
                                              )}
                                            >
                                              {/* <PencilAltIcon
                                                className="mr-3 h-5 w-5 text-gray-700 group-hover:text-gray-500"
                                                aria-hidden="true"
                                              /> */}
                                              Evaluation
                                            </Link>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </>
                              )}
                            </Menu>
                          </td>
                        </tr>
                      </>
                    ))}
              </tbody>
            </table>
            {handleGetBatch.length === 0 && (
              <div className="px-6 py-3 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {" "}
                Data Not Found...
              </div>
            )}

            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                {/* <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * 10 + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {currentPage * 10 < handleGetBatch.length
                        ? currentPage * 10
                        : handleGetBatch.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{handleGetBatch.length}</span>{" "}
                    results
                  </p>
                </div> */}
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
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
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
      </Page>
    </AppLayout>
  );
}
