import moment from "moment";
import { Dialog, Transition, Popover } from "@headlessui/react";
import { Fragment, useContext } from "react";
import Select from "react-select";
import { AuthContext } from "../AuthProviders/AuthProvider";

const ModalContent = ({
  data,
  isOpen,
  options,
  handleChange,
  submitUserNewData,
  formatOptionLabel,
  deleteUserFromProject,
  closeModal,
  selectedOption,
  handleCreatorCompletedTask,
  handleUserDoneStatus,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <>
        {/* modalContent  */}
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
                  <Dialog.Panel className="w-full max-w-4xl transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-4"
                    >
                      <div className="flex items-center">
                        {data.email === user.email &&
                          data.status === "pending" && (
                            <div className="flex gap-2">
                              <div>
                                <button
                                  onClick={() =>
                                    handleCreatorCompletedTask(data._id)
                                  }
                                  className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  data-ripple-light="true"
                                >
                                  Complete
                                </button>
                              </div>
                            </div>
                          )}

                        <div className="ml-2">
                          <button
                            onClick={() => handleUserDoneStatus(data._id)}
                            className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold  text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                          >
                            Done
                          </button>
                        </div>

                        {/* assign */}
                        <div className="w-full">
                          <Popover className="relative">
                            {({ open }) => (
                              <>
                                <Popover.Button
                                  className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >
                                  <div>
                                    <p
                                      className={`middle none center rounded-lg font-sans text-xs font-bold text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none inline-flex w-full justify-center py-3 px-6 ${
                                        data.sharedUsersEmails.length < 1
                                          ? "text-black bg-opacity-20 hover:bg-opacity-30 "
                                          : ""
                                      }`}
                                    >
                                      {data.sharedUsersEmails.length < 1 ? (
                                        <div className="flex justify-center items-center gap-2 text-black">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                            />
                                          </svg>
                                          Unassigned
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-4 w-4 text-black hover:text-violet-600"
                                            aria-hidden="true"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                            />
                                          </svg>
                                        </div>
                                      ) : (
                                        <>
                                          <div className="mt-auto flex gap-2">
                                            {/* USERS Rounded full base sized grouped compact avatars */}
                                            <div className="flex items-center justify-center w-full">
                                              <div className="flex -space-x-4 transition-all hover:-space-x-2">
                                                {data.sharedUsersEmails.length >
                                                  1 &&
                                                  data.sharedUsersEmails.map(
                                                    (userD) => (
                                                      <a
                                                        href="#"
                                                        className="relative inline-flex items-center justify-center w-8 h-8 text-white transition-all rounded-full"
                                                        key={userD.email} // Add a unique key prop for each mapped element
                                                      >
                                                        <img
                                                          src={userD?.photo}
                                                          alt="user name"
                                                          title="user name"
                                                          width="40"
                                                          height="40"
                                                          className="max-w-full border-2 border-white rounded-full object-cover"
                                                        />
                                                      </a>
                                                    )
                                                  )}

                                                <a
                                                  href="#"
                                                  className="relative inline-flex items-center justify-center w-8 h-8 text-sm transition-all border-2 border-white rounded-full bg-slate-200 text-slate-500"
                                                >
                                                  +
                                                  {data.sharedUsersEmails
                                                    .length - 1}
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </p>
                                  </div>
                                  <p
                                    className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                    aria-hidden="true"
                                  />
                                </Popover.Button>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0 translate-y-1"
                                  enterTo="opacity-100 translate-y-0"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100 translate-y-0"
                                  leaveTo="opacity-0 translate-y-1"
                                >
                                  <Popover.Panel className="absolute left-[35%] z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl ">
                                    <div className="rounded-xl  shadow-lg ring-1 ring-black ring-opacity-5">
                                      <div className="relative overflow-hidden overflow-y-auto  gap-8 bg-white p-7">
                                        <div className="p-4">
                                          <div className="flex justify-between">
                                            <button className="text-sm">
                                              Assign
                                            </button>
                                            <button className="text-sm">
                                              Manage
                                            </button>
                                          </div>
                                          <div className="mt-8">
                                            <Select
                                              isMulti
                                              isSearchable
                                              value={selectedOption}
                                              onChange={handleChange}
                                              options={options}
                                              formatOptionLabel={
                                                formatOptionLabel
                                              }
                                            />
                                          </div>
                                          <div className="flex  justify-center w-full">
                                            <button
                                              className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-4"
                                              onClick={submitUserNewData}
                                            >
                                              Add users
                                            </button>
                                          </div>
                                          <div className="mt-4">
                                            <div className="flex flex-col">
                                              <div className="-m-1.5 overflow-x-auto">
                                                <div className="p-1.5 min-w-full inline-block align-middle">
                                                  <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                      <thead>
                                                        <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                                                          <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                                          >
                                                            Name
                                                          </th>
                                                          <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                                          >
                                                            Role
                                                          </th>
                                                          <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                                          >
                                                            Status
                                                          </th>
                                                          <th
                                                            scope="col"
                                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                                                          >
                                                            Action
                                                          </th>
                                                        </tr>
                                                      </thead>
                                                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                        {data.sharedUsersEmails &&
                                                          data.sharedUsersEmails.map(
                                                            (userD, index) => (
                                                              <tr key={index}>
                                                                <td className="flex gap-2 justify-center items-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                  <img
                                                                    src={
                                                                      userD.photo
                                                                    }
                                                                    alt="user name"
                                                                    title="user name"
                                                                    width="40"
                                                                    height="40"
                                                                    className="max-w-full border-2 border-white rounded-full object-cover"
                                                                  />
                                                                  {userD.email}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                                  {userD.title}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                                  {userD.status}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                  <a
                                                                    className="text-blue-500 hover:text-blue-700"
                                                                    onClick={() =>
                                                                      deleteUserFromProject(
                                                                        userD.email,
                                                                        data._id
                                                                      )
                                                                    }
                                                                  >
                                                                    Delete
                                                                  </a>
                                                                </td>
                                                              </tr>
                                                            )
                                                          )}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        </div>
                        <div className="flex gap-2">
                          {/* delete button */}
                          <div>
                            <button
                              className="middle none center rounded-lg bg-pink-500 p-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              data-ripple-light="true"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                          {/* close button */}
                          <div>
                            <button
                              onClick={closeModal}
                              className="middle none center rounded-lg bg-pink-500 p-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              data-ripple-light="true"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Dialog.Title>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                            {data.projectName}
                          </h3>

                          <p className="mt-1 text-xs font-medium text-gray-600">
                            {data.publisherName}
                            {data.email === user.email ? (
                              <span className="inline-flex items-center uppercase ml-2 gap-1.5 py-.5 px-1 rounded-full text-xs font-medium bg-yellow-400 text-black">
                                <span className="w-1.5 h-1.5 inline-block bg-indigo-400 rounded-full"></span>
                                {data.title}
                              </span>
                            ) : (
                              <span className="ml-2 inline-flex items-center gap-1.5 py-.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <span className="w-1.5 h-1.5 inline-block bg-indigo-400 rounded-full"></span>
                                Worker
                              </span>
                            )}
                          </p>
                        </div>

                        <div className="hidden sm:block sm:shrink-0">
                          <img
                            alt={data.projectName}
                            src={data.image}
                            className="h-16 w-16 rounded-lg object-cover shadow-sm"
                          />
                        </div>
                      </div>
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <div className="flex gap-2">
                          <div className="w-[60%]">
                            <p className=" text-sm text-gray-500">
                              {data.description}
                            </p>
                          </div>

                          <div className="w-[40%] bg-gray-100 rounded-xl p-2">
                            <h3 className="font-semibold text-center text-gray-900 uppercase">
                              Activity
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex flex-col-reverse">
                            <dd className="text-xs text-gray-500">
                              <p>
                                {moment(data.projectAddedDate).format(
                                  "MMMM D, YY "
                                )}
                              </p>
                            </dd>
                            <dt className="text-sm font-medium text-gray-600">
                              Published
                            </dt>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </div>
  );
};

export default ModalContent;
