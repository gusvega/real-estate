"use client";

import Cookies from "js-cookie";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openNewModal = () => {
    setIsNewModalOpen(!isNewModalOpen);
  };

  const openEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleDeleteCookie = () => {
    // Remove the 'user_cookie' when the button is clicked
    Cookies.remove("gusvega_cookie");
    setToken(null); // Update the state to indicate that the token has been removed
    router.push("/");
  };

  return (
    <>
      <div className="min-h-full">
        <nav className="bg-indigo-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center text-white">
                GUS
                {/* <div className="flex-shrink-0">
            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300" alt="Your Company"/>
          </div> */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* <!-- Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" --> */}
                    <a
                      href="#"
                      className="bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      STR
                    </a>
                    {/* <a href="#" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md px-3 py-2 text-sm font-medium">Team</a>
              <a href="#" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md px-3 py-2 text-sm font-medium">Projects</a>
              <a href="#" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
              <a href="#" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md px-3 py-2 text-sm font-medium">Reports</a> */}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* <button type="button" className="relative rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button> */}

                  {/* <!-- Profile dropdown --> */}
                  <div className="relative ml-3">
                    <div>
                      <button
                        type="button"
                        className="relative flex max-w-xs items-center rounded-full bg-indigo-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <button
                          onClick={handleDeleteCookie}
                          className=" text-white rounded-md px-3 py-2 text-sm font-medium"
                          aria-current="page"
                        >
                          Sign Out
                        </button>
                      </button>
                    </div>

                    {/* <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              --> */}
                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                    {/* <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
              </div> */}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* <!-- Mobile menu button --> */}
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Mobile menu, show/hide based on menu state. --> */}
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {/* <!-- Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" --> */}
              <a
                href="#"
                className="bg-indigo-700 text-white block rounded-md px-3 py-2 text-base font-medium"
                aria-current="page"
              >
                Tools
              </a>
              {/* <a href="#" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md px-3 py-2 text-base font-medium">Team</a>
        <a href="#" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md px-3 py-2 text-base font-medium">Projects</a>
        <a href="#" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
        <a href="#" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md px-3 py-2 text-base font-medium">Reports</a> */}
            </div>
          </div>
        </nav>

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold leading-6 text-gray-900">
              Short Term Property Analysis
            </h1>
          </div>
        </header>
        <main>
          <div className="bg-white mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* <!-- Your content --> */}
            <div className="px-4 sm:px-6 lg:px-8 mt-10">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Properties
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    List of analyses performed on properties
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={openNewModal}
                  >
                    New
                  </button>
                  {isNewModalOpen ? (
                    <div
                      className="relative z-10"
                      aria-labelledby="modal-title"
                      role="dialog"
                      aria-modal="true"
                    >
                      {/* New Modal */}
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                      <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <svg
                                  className="h-6 w-6 text-green-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
                              </div>
                              <div className="mt-3 text-center sm:mt-5">
                                <h3
                                  className="text-base font-semibold leading-6 text-gray-900"
                                  id="modal-title"
                                >
                                  New Modal
                                </h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Consequatur amet labore.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                              <button
                                type="button"
                                onClick={() =>
                                  setIsNewModalOpen(!isNewModalOpen)
                                }
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Go back to dashboard
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Address
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Investment
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Net Income
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            ROI
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Gross Income
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Expenses
                          </th>

                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Cash Flow
                          </th>
                          <th
                            scope="col"
                            className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                          >
                            <button className="sr-only">Edit</button>

                            {isEditModalOpen ? (
                              <div
                                className="relative z-10"
                                aria-labelledby="modal-title"
                                role="dialog"
                                aria-modal="true"
                              >
                                {/* Edit Modal */}
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                                <div className="fixed inset-0 z-10 overflow-y-auto">
                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                      <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                          <svg
                                            className="h-6 w-6 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M4.5 12.75l6 6 9-13.5"
                                            />
                                          </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                          <h3
                                            className="text-base font-semibold leading-6 text-gray-900"
                                            id="modal-title"
                                          >
                                            Edit Modal
                                          </h3>
                                          <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                              Lorem ipsum dolor sit amet
                                              consectetur adipisicing elit.
                                              Consequatur amet labore.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-5 sm:mt-6">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setIsEditModalOpen(!isEditModalOpen)
                                          }
                                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                          Go back to dashboard
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                            AAPS0L
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            Chase &amp; Co.
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                            CAC
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            +$4.37
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            $3,509.00
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            12.00
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            $4,397.00
                          </td>
                          <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={openEditModal}
                            >
                              Edit<span className="sr-only">, AAPS0L</span>
                            </a>
                          </td>
                        </tr>

                        {/* <!-- More transactions... --> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
