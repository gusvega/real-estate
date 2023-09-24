'use client'

import Navigation from "@/app/home/components/navigation"
import { useMyContext } from "../../../server/MyContext";

// ---
import { Fragment, useState } from 'react'
import { Dialog, Listbox, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import { BellIcon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
]
const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
    },
    {
      id: 3,
      title: 'Business cards',
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: '12.0',
      rate: '$100.00',
      price: '$1,200.00',
    },
    {
      id: 4,
      title: 'T-shirt design',
      description: 'Three t-shirt design concepts.',
      hours: '4.0',
      rate: '$100.00',
      price: '$400.00',
    },
  ],
}
const activity = [
  { id: 1, type: 'created', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
  { id: 2, type: 'edited', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
  { id: 3, type: 'sent', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
  { id: 6, type: 'paid', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]
const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIconMini, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// --

function formatString(input) {
  // Convert camelCase to sentence case
  const sentenceCase = input.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Remove 'estimated' and 'PerMonth' words
  const removedWords = sentenceCase
    .replace(/\bestimated\b/g, '')
    .replace(/\bPer\sMonth\b/g, '')
    .trim();

  // Capitalize the first letter of each word
  const capitalizedWords = removedWords
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return capitalizedWords;
}


export default function Page({ params }: { params: { id: string } }) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selected, setSelected] = useState(moods[5])

  const { data, updateData } = useMyContext();

  return (
    <>
      <Navigation />
      <main>
        <header className="relative isolate pt-16">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-x-6">
                <img
                  src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                  alt=""
                  className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                />
                <h1>
                  <div className="mt-1 text-base font-semibold leading-6 text-gray-900">{data.analyses.properties[params.id]?.values?.property?.address}</div>
                  <div className="text-sm leading-6 text-gray-500">
                    {data.analyses.properties[params.id]?.values?.property?.city}, <span className="text-gray-700">{data.analyses.properties[params.id]?.values?.property?.state}</span>
                  </div>
                </h1>
              </div>
              <div className="flex items-center gap-x-4 sm:gap-x-6">
                <button type="button" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                  Delete
                </button>
                <a href="#" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                  Save
                </a>
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add to Properties
                </a>

                <Menu as="div" className="relative sm:hidden">
                  <Menu.Button className="-m-3 block p-3">
                    <span className="sr-only">More</span>
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900'
                            )}
                          >
                            Copy URL
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="mb-10">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Property Details</h2>

              <dl className=" grid grid-cols-4 text-sm leading-6 sm:grid-cols-4">



                <div className="mt-3 border-t  pt-6 sm:pr-4">
                  <dd className=" text-gray-500">
                    <span className="font-medium text-gray-900">Bedrooms</span>
                    <br />
                    {data.analyses.properties[params.id]?.values?.property.bedrooms}
                  </dd>
                </div>

                <div className="mt-3 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dd className="text-gray-500">
                    <span className="font-medium text-gray-900">Baths</span>
                    <br />
                    {data.analyses.properties[params.id]?.values?.property.baths}
                  </dd>
                </div>
                <div className="mt-3 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dd className="text-gray-500">
                    <span className="font-medium text-gray-900">Sqft</span>
                    <br />
                    {data.analyses.properties[params.id]?.values?.property.squareFeet}
                  </dd>
                </div>
                <div className="mt-3 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dd className="text-gray-500">
                    <span className="font-medium text-gray-900">Year Build</span>
                    <br />
                    {data.analyses.properties[params.id]?.values?.property.yearBuilt}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-start-3 lg:row-end-1">
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">Return on Investment</dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">{data.analyses.properties[params.id]?.calculations?.cashOnCashReturn}%</dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Status</dt>
                    <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                      Good
                    </dd>
                  </div>
                  <div className="mt-6 flex justify-between w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <dd className="text-sm font-medium leading-6 text-gray-900">Investment</dd>
                    <dd className="text-sm font-medium leading-6 text-gray-900">${data.analyses.properties[params.id]?.calculations?.totalInvestment}</dd>
                  </div>
                  <div className="mt-4 flex justify-between w-full flex-none gap-x-4 px-6">
                    <dd className="text-sm font-medium leading-6 text-gray-900">Gross Income</dd>
                    <dd className="text-sm font-medium leading-6 text-gray-900">${data.analyses.properties[params.id]?.calculations?.grossIncomePerYear}</dd>
                  </div>
                  <div className="mt-4 flex w-full justify-between flex-none gap-x-4 px-6">
                    <dd className="text-sm font-medium leading-6 text-gray-900">Expenses</dd>
                    <dd className="text-sm font-medium leading-6 text-gray-900">${data.analyses.properties[params.id]?.calculations?.totalExpensesPerYear}</dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none justify-between gap-x-4 px-6">
                    <dd className="text-sm font-medium leading-6 text-gray-900">Net Income</dd>
                    <dd className="text-sm font-medium leading-6 text-gray-900">${data.analyses.properties[params.id]?.calculations?.netOperatingIncome}</dd>
                  </div>
                  <div className="mt-4 mb-5 flex w-full flex-none gap-x-4 px-6  justify-between">
                    <dd className="text-sm font-medium leading-6 text-gray-900">Cash Flow</dd>
                    <dd className="text-sm font-medium leading-6 text-gray-900">${data.analyses.properties[params.id]?.calculations?.cashFlowPerYear}</dd>
                  </div>
                </dl>

              </div>
            </div>

            <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Calculations</h2>

              {Object.entries(data.analyses.properties[params.id]?.calculations)
                .filter(([key, value]) => key === 'downPaymentAmount' || key === 'estimatedClosingCostAmount' || key === 'totalInvestment' || key === 'capRatePercentage' || key === 'cashOnCashReturn')
                .map(([key, value]) => (
                  <div key={key}>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">{formatString(key)}</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">${value as string}</span>
                      </dd>
                    </div>
                  </div>
                ))}


              <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                <colgroup>
                  <col className="w-full" />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="border-b border-gray-200 text-gray-900">
                  <tr>
                    <th scope="col" className="px-0 py-3 font-semibold">

                    </th>
                    <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                      Month
                    </th>
                    <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                      1 Year
                    </th>
                    <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                      5 Years
                    </th>
                    <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                      10 Years
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(Object.entries(data.analyses.properties[params.id]?.calculations)).filter(([key, value]) =>
                    key !== 'downPaymentAmount' &&
                    key !== 'estimatedClosingCostAmount' &&
                    key !== 'totalInvestment' &&
                    key !== 'capRatePercentage' &&
                    key !== 'cashOnCashReturn' &&
                    key !== 'grossIncomePerYear' &&
                    key !== 'cashFlowPerYear' &&
                    key !== 'estimatedPropertyTaxesPerYear' &&
                    key !== 'estimatedInsuranceAmountPerYear' &&
                    key !== 'privateMortgageInsuranceAmountPerYear' &&
                    key !== 'airBNBFeePercentagePerYear' &&
                    key !== 'operatingExpensesPerYear' &&
                    key !== 'totalExpensesPerYear'
                  ).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="max-w-0 px-0 py-5 align-top">
                        <div className="truncate font-medium text-gray-900">{formatString(key)}</div>
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                        {value as string}
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                        {typeof value === 'number' ? (
                          <>
                            {value * 12}
                          </>
                        ) : typeof value === 'string' ? (
                          <>
                            {parseInt(value) * 12}
                          </>
                        ) : (
                          <>
                            {value} {/* Display the non-numeric value */}
                          </>
                        )}
                      </td>
                      <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      {typeof value === 'number' ? (
                          <>
                            {value * 12 * 5}
                          </>
                        ) : typeof value === 'string' ? (
                          <>
                            {parseInt(value) * 12 * 5}
                          </>
                        ) : (
                          <>
                            {value} {/* Display the non-numeric value */}
                          </>
                        )}
                      </td>
                      <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                      {typeof value === 'number' ? (
                          <>
                            {value * 12 * 10}
                          </>
                        ) : typeof value === 'string' ? (
                          <>
                            {parseInt(value) * 12 * 10}
                          </>
                        ) : (
                          <>
                            {value} {/* Display the non-numeric value */}
                          </>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
                {/* <tfoot>
                    <tr>
                      <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                      >
                        Subtotal
                      </th>
                      <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">{invoice.subTotal}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                        Tax
                      </th>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                      >
                        Tax
                      </th>
                      <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{invoice.tax}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                        Total
                      </th>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                      >
                        Total
                      </th>
                      <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                        {invoice.total}
                      </td>
                    </tr>
                  </tfoot> */}
              </table>



              <div className="mt-16">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">Initial Investment Information</h3>
                </div>
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Asking Price</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">$120,000</span>
                        <span className="ml-4 flex-shrink-0">
                          <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Offer Price</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">$120,000</span>
                        <span className="ml-4 flex-shrink-0">
                          <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Down Payment Percent</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">3%</span>
                        <span className="ml-4 flex-shrink-0">
                          <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Closing Cost Percentage</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">3%</span>
                        <span className="ml-4 flex-shrink-0">
                          <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Renovation Costs</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">$120,000</span>
                        <span className="ml-4 flex-shrink-0">
                          <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Setup Costs</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">$120,000</span>
                        <span className="ml-4 flex-shrink-0">
                          <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                            Update
                          </button>
                        </span>
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-lg font-medium leading-6 text-gray-900">TOTAL</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow text-lg">$120,000</span>

                      </dd>
                    </div>

                  </dl>
                </div>
              </div>

              <div className="mt-16">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">Monthly Expenses</h3>
                </div>
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {Object.entries(data.analyses.properties[params.id]?.values?.expenses).map(([key, value]) => (
                      <>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900 ">{formatString(key)}</dt>
                          <dd className="mt-1 ml-40 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">{value as string}</span>
                            <span className="ml-4 flex-shrink-0">
                              <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                      </>
                    ))}



                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-lg font-medium leading-6 text-gray-900">TOTAL</dt>
                      <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow text-lg">$120,000</span>

                      </dd>
                    </div>

                  </dl>
                </div>
              </div>
            </div>


          </div>
        </div>
      </main>
    </>
  )
}