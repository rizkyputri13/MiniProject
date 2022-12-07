import { Dialog, Transition, Menu } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { EditFilterRequest} from "../../redux-saga/Action/CandAction";


export default function Modal({ filter }) {
  let [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const filterStatus = ['New', 'Running', 'Closed'];

  const id = useSelector((state) => state.candidateStated.filters.boapEntityId);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const formik = useFormik({
    initialValues: {
      boapId: id,
      skor: filter ? filter.boapTotalSkor : '',
      status: filter ? filter.boapStatus : '',
      review: filter ? filter.boapReview : '',

    },
    validationSchema: Yup.object().shape({
      boapId: Yup.number().required(),
      skor: Yup.string().required('Please '),
      review: Yup.string().required('Please'),
      status: Yup.string()
        .oneOf(filterStatus, 'Please ')
        .required('Please'),
    }),

    onSubmit: async (values) => {
      if (filter) {
        const payload = {
          boapEntityId: filter.boapId,
          boapReview: values.review,
          boapTotalSkor: values.skor,
          boapStatus: values.status,
        };
        dispatch(EditFilterRequest(payload));
      }  closeModal();
    },
  });

  return (
    <>
       <div>
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
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 flex items-center gap-3 mb-3 text-gray-700'
                  >
    
                    Switch Status
                  </Dialog.Title>

                  <div>
                    <form
                      className='flex flex-col gap-3'
                      onSubmit={formik.handleSubmit}
                    >
                      <div className='grid grid-cols-2 items-center mt-2 gap-3'>
                        <label htmlFor='skor'>Score</label>
                        <input
                          value={formik.values.skor}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className='rounded-lg px-2 py-1'
                          type='text'
                          name='skor'
                          id='skor'
                          placeholder='ex. 083456789098'
                        />
                      </div>
                      {formik.touched.skor && formik.errors.skor ? (
                        <span className='mt-2 text-sm text-red-600'>
                          {formik.errors.skor}
                        </span>
                      ) : null}
                      <div className='grid grid-cols-2 items-center mt-2 gap-3'>
                        <label htmlFor='status'>Status</label>
                        <select
                          value={formik.values.status}
                          onSelect={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onChange={(e) =>
                            formik.setFieldValue('status', e.target.value)
                          }
                          className='rounded-lg px-2 py-1 col-span-1'
                          name='status'
                          id='status'
                        >
                          <option value='Bachelor'>Status</option>
                          {filterStatus.map((status, i) => (
                            <option key={i} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formik.touched.status && formik.errors.status ? (
                        <span className='mt-2 text-sm text-red-600'>
                          {formik.errors.status}
                        </span>
                      ) : null}
                      <div className='grid grid-cols-2 items-center mt-2 gap-3'>
                        <label htmlFor='review'>Review</label>
                        <input
                          value={formik.values.review}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className='rounded-lg px-2 py-1'
                          type='text'
                          name='review'
                          id='review'
                          placeholder='ex. 083456789098'
                        />
                      </div>
                      {formik.touched.review && formik.errors.review ? (
                        <span className='mt-2 text-sm text-red-600'>
                          {formik.errors.review}
                        </span>
                      ) : null}
                      <div className='mt-4 flex gap-2 justify-end'>
                        <button
                          type='submit'
                          className='px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3'
                          // onClick={closeModal}
                        >
                          <div className='flex items-center space-x-1'>
                           
                            <span>{filter ? 'Update' : 'Save'}</span>
                          </div>
                        </button>
                        <button
                          type='button'
                          className='px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3'
                          onClick={closeModal}
                        >
                          <div className='flex items-center space-x-1'>
                           
                            <span>Cancel</span>
                          </div>
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}