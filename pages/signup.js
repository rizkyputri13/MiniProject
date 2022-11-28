/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch } from 'react-redux';
import { useFormik } from "formik";
import { doAddSignupRequest } from './redux-saga/Action/UsrAction';
import { useRouter } from 'next/router';
import { LockClosedIcon } from '@heroicons/react/solid'
import * as Yup from "yup";
import Link from 'next/link';

export default function signup() {
  const dispatch = useDispatch();
  const router = useRouter()
  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required('First Name is required'),
    LastName: Yup.string().required('Last Name is required'),
    Number: Yup.string().max(14).required('Phone Number is required'),
    username: Yup.string().max(15).required('Username is required'),
    email: Yup.string().email('Must be a valid email').max(50).required('Email is required'),
    password: Yup
      .string()
      .min(3)
      .max(10)
      .required('Password is required'),
    confirmPassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    })
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      FirstName: "",
      LastName: "",
      Number: "",
      PontyCode: "",
      confirmPassword: "",
      RoleId: 1
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      let payload = {
        userFirstName: values.FirstName,
        userLastName: values.LastName,
        userName: values.username,
        password: values.password,
        uspoNumber: values.Number,
        uspoPontyCode: values.PontyCode,
        pmailAddress: values.email,
        usroRoleId: values.RoleId
      };
      dispatch(doAddSignupRequest(payload));
      router.push('/signin')
    }
  });
  return (
    <div>
      <div className="text-center mt-24">
        <div className="flex items-center justify-center">
          <img
            className="h-10 w-auto"
            src="../assets/images/codeid.png"
            alt="codeid"
          />
        </div>
        <h2 className="text-4xl tracking-tight">
          Sign up into your account
        </h2>
        <span className="text-sm">or{' '}
          <Link href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in your account
          </Link>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">First Name</label>
              <input
                id="FirstName"
                name="FirstName"
                type="text"
                value={formik.values.FirstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="FirstName"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="First Name"
                required />
              {formik.touched.FirstName && formik.errors.FirstName ?
                <span className="mt-2 text-sm text-red-600">{formik.errors.FirstName}</span> : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Last Name</label>
              <input
                id="LastName"
                name="LastName"
                type="text"
                value={formik.values.LastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="LastName"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Last Name"
                required />
              {formik.touched.LastName && formik.errors.LastName ?
                <span className="mt-2 text-sm text-red-600">{formik.errors.LastName}</span> : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="username"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Username"
                required />
              {formik.touched.username && formik.errors.username ?
                <span className="mt-2 text-sm text-red-600">{formik.errors.username}</span> : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Email Address"
                required />
              {formik.touched.email && formik.errors.email ?
                <span className="mt-2 text-sm text-red-600">{formik.errors.email}</span> : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='Password'>Code Telp.</label>
              <select
                id="PontyCode"
                name="PontyCode"
                type="select"
                value={formik.values.PontyCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="PontyCode"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Code Telp."
              >
                <option value="">
                  Select Your Choice
                </option>
                <option value="Cell">
                  Cell
                </option>
                <option value="Home">
                  Home
                </option>
              </select>
              {formik.touched.PontyCode && formik.errors.PontyCode ?
                <span className="mt-2 text-sm text-red-600">{formik.errors.PontyCode}</span> : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='Password'>Phone Number</label>
              <input
                id="Number"
                name="Number"
                type="text"
                value={formik.values.Number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="Number"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Number Telp."
                required />
              {formik.touched.Number && formik.errors.Number ?
                <span className="mt-2 text-sm text-red-600">{formik.errors.Number}</span> : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='Password'>Role Type</label>
              <select
                id="RoleId"
                name="RoleId"
                type="select"
                value={formik.values.RoleId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="RoleId"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Role Type"
              >
                <option value="1">
                  Candidat
                </option>
                <option value="11">
                  Outsource
                </option>
              </select>
              {formik.touched.RoleId && formik.errors.RoleId ?
                <span className="mt-2 text-sm text-red-600">{formik.errors.RoleId}</span> : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='Password'>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Password"
                required />
              {formik.touched.password && formik.errors.password ?
                <span className="mt-2 text-sm text-red-600">{formik.errors.password}</span>
                : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='Password'>Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                placeholder="Confirm Password"
                required />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                <span className="mt-2 text-sm text-red-600">{formik.errors.confirmPassword}</span>
                : null}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button onClick={formik.handleSubmit} className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}