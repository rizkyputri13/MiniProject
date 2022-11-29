import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import Page from "../../component/commons/Page";
import AppLayout from "../../component/layout/AppLayout";
import { useEffect, useState } from "react";
import BatchApi from "../../api/BatchApi";
import { useSelector, useDispatch } from "react-redux";
import ModalOption from "../../component/ModalOption";
import { GetBatchRequest } from "../../redux-saga/Action/BatchAction";

export default function Batch() {
  let navigate = useRouter();

  const dispatch = useDispatch();

  const listBatch = useSelector(
    (state) => state.batchStated
  );

  useEffect(() => {
    dispatch(GetBatchRequest());
    console.log(listBatch);
  }, [dispatch, listBatch]);

  // const [batchs, setBatchs] = useState([]);
  // const [batchStudents, setBatchStudents] = useState([]);
  // const [batchEvas, setBatchEvas] = useState([]);
  // const [emps, setEmps] = useState([]);
  // const [users, setUsers] = useState([]);

  // // useState(() => {
  // //   CandidateApi.list().then((data) => {
  // //     setUsers(data);
  // //   });
  // // }, []);

  // useState(() => {
  //   BatchApi.getBatch().then((data) => {
  //     setBatchs(data);
  //   });
  // }, []);

  // useState(() => {
  //   BatchApi.getBatchStudent().then((data) => {
  //     setBatchStudents(data);
  //   });
  // }, []);

  // useState(() => {
  //   BatchApi.getBatchEva().then((data) => {
  //     setBatchEvas(data);
  //   });
  // }, []);

  // useState(() => {
  //   BatchApi.getEmp().then((data) => {
  //     setEmps(data);
  //   });
  // }, []);

  return (
    <AppLayout>
      {/* Breadcrumb */}
      <nav className="flex px-5 py-3 " aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="../app"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <a
                href="../app/batch"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Batch
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <Page
        title="Batch"
        titleButton="Create"
        onClick={() => navigate("/app/batch/")}
      >
        <nav class="px-20 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div class="container flex flex-wrap items-center justify-between ">
            <h2>Search by Category</h2>
            <input
              type="text"
              placeholder="batch, technology, trainer"
              className="px-5 flex-1 input input-bordered py-2 
            input-xs w-full max-w-xs rounded-md"
            />
            <select className="flex rounded-lg max-w-xs px-7y ">
              <option disabled selected>
                Status
              </option>
              <option>New</option>
              <option>Running</option>
              <option>Closed</option>
            </select>
            <button
              type="button"
              class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-500 focus:ring-4 
              focus:outline-none focus:ring-purple-300  rounded-lg text-sm px-5 py-2.5 text-center  dark:border-purple-400 
              dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
            >
              Search
            </button>
          </div>
        </nav>
        <br></br>
      </Page>

      <div>
        <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                BATCH
              </th>
              <th scope="col" className="py-3 px-6">
                TECHNOLOGY
              </th>
              <th scope="col" className="py-3 px-6">
                MEMBERS
              </th>
              <th scope="col" className="py-3 px-6">
                PERIODE
              </th>
              <th scope="col" className="py-3 px-6">
                TRAINER
              </th>
              <th scope="col" className="py-3 px-6">
                STATUS
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <div className="py-4 px-6">
                  {listBatch &&
                    listBatch.map((batch) => (
                      // eslint-disable-next-line react/jsx-key
                      <td>{batch.batchName}</td>
                    ))}
                </div>
                <td className="py-4 px-6">
                  <div>
                    {batchEvas &&
                      batchEvas.map((batchEva) => (
                        // eslint-disable-next-line react/jsx-key
                        <li>{batchEva.baseSkill}</li>
                      ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex mb-3 -space-x-4">
                    {/* {batchStudents &&
                      batchStudents.map((batchStudent) => ( */}
                    <>
                      <img
                        className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                        src="../assets/images/yuri.jpg"
                        alt=""
                      />
                      <img
                        className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                        src="../assets/images/yuri.jpg"
                        alt=""
                      />
                      <img
                        className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                        src="../assets/images/yuri.jpg"
                        alt=""
                      />
                      <img
                        className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                        src="../assets/images/yuri.jpg"
                        alt=""
                      />
                    </>
                  </div>
                </td>
                <th>
                  {batchs &&
                    batchs.map((batch) => (
                      <>
                        <div className="text-gray-600 font-medium">
                          {batch.batchStartDate}
                        </div>
                        <div className="text-gray-600 font-medium">
                          {batch.batchEndDate}
                        </div>
                      </>
                    ))}
                </th>
                <td className="py-4 px-6">
                  <div>
                    {batchs &&
                      batchs.map((batch) => (
                        // eslint-disable-next-line react/jsx-key
                        <td>{}</td>
                      ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    {batchs &&
                      batchs.map((batch) => (
                        // eslint-disable-next-line react/jsx-key
                        <td>{batch.batchStatus}</td>
                      ))}
                  </div>
                </td>

                <td>
                  <ModalOption />
                </td>
              </tr>
            </>
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
