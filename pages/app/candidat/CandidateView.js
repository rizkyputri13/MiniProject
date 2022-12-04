import { useState } from "react";
import { Tab } from "@headlessui/react";
import AppLayout from "../../component/layout/AppLayout";
import Page from "../../component/commons/Page";
import { useDispatch, useSelector } from "react-redux";
import { GetCandRequest } from "../../redux-saga/Action/CandAction";
import Modal from "../../component/ModalReview";
import ModalReview from "../../component/ModalReview";
import CandidateApi from "../../api/CandidateApi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Candidates() {
  const [categories] = useState({
    Apply: [],
    "Filtering Test": [],
    Contract: [],
    Disqualified: [],
    "Not Responding": [],
  });

  const [users, setUsers] = useState([]);
  const [userEdus, setUserEdus] = useState([]);

  useState(() => {
    CandidateApi.user().then((data) => {
      setUsers(data);
    });
  }, []);

  useState(() => {
    CandidateApi.userEdu().then((data) => {
      setUserEdus(data);
    });
  }, []);

  return (
    <AppLayout>
      <>
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
                  href="../app/candidat"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Candidates
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </>

      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Candidates
          </h1>
        </div>
      </div>

      <div className="w-full max-w px-2 py-0 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1  bg-purple-300/20 p-1">
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
            <select className="select rounded-lg max-w-xs">
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
            <select className="select rounded-lg max-w-xs">
              <option disabled selected>
                Year
              </option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
            </select>
          </Tab.List>
        </Tab.Group>
      </div>
      <br></br>
      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          </thead> */}

          <tbody>
            <>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <div>
                  {users &&
                    users.map((user) => (
                      // eslint-disable-next-line react/jsx-key
                      <th
                        scope="row"
                        className="flex items-center py-2 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full flex-shrink-0"
                          src={"../assets/images/yuri.jpg"}
                          alt="Jese image"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {user.userName}
                          </div>
                          <div className="font-normal text-gray-500"></div>
                        </div>
                      </th>
                    ))}
                </div>
                <td className="pl-3">
                  {userEdus &&
                    userEdus.map((userEdu) => (
                      // eslint-disable-next-line react/jsx-key
                      <td>{userEdu.usduSchool}</td>
                    ))}
                </td> 

                <td className="py-4 px-6">
                  <div>
                    <td>
                      
                    </td>
                  </div>
                </td>
                <td className="py-4 px-6">{}</td>
                <td className="py-4 px-6">{}</td>
                <td className="py-4 px-6">Applied on 5 January, 2022</td>
                <td>
                  <ModalReview />
                </td>
              </tr>
            </>
          </tbody>
        </table>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* <nav aria-label="Page navigation example ">
        <ul className="inline-flex -space-x-px  ">
          <li>
            <a
              href="#"
              className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav> */}
    </AppLayout>
  );
}
