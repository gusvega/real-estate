"use client";

import Cookies from "universal-cookie";
import { useState } from "react";

import { useRouter } from "next/navigation";
import pmt from "formula-pmt";
import { v4 as uuidv4 } from "uuid";

import { useMyContext } from "../../server/MyContext";

export default function HomePage() {
  const router = useRouter();
  const cookies = new Cookies();

  const { data, updateData } = useMyContext();

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
    cookies.remove("gusvega_cookie");
    setToken(null);
    router.push("/");
  };

  const [currentTab, setCurrentTab] = useState("property");

  const tabs = {
    property: {
      name: "Property",
    },
    purchase: {
      name: "Purchase",
    },
    income: {
      name: "Income",
    },
    expenses: {
      name: "Expenses",
    },
  };

  const tabSelect = (tab: string) => {
    console.log("TAB", tab);
    setCurrentTab(tab);
  };

  interface Calculations {
    downPaymentAmount: number;
    estimatedClosingCostAmount: number;
    totalInvestment: number;

    grossIncomePerMonth: number;
    grossIncomePerYear: number;
    netOperatingIncome: number;
    capRatePercentage: number;
    cashFlowPerMonth: number;
    cashFlowPerYear: number;
    cashOnCashReturn: number;

    mortgageAmount: number;
    numberOfPayments: number;
    monthlyPrinciplePlusInterest: number;
    estimatedPropertyTaxesPerYear: number;
    estimatedInsuranceAmountPerYear: number;
    privateMortgageInsuranceAmountPerYear: number;
    airBNBFeePercentagePerMonth: number;
    airBNBFeePercentagePerYear: number;
    maintenanceAmountPerMonth: number;
    managementFeeAmountPerMonth: number;

    operatingExpensesPerMonth: number;
    operatingExpensesPerYear: number;
    totalExpensesPerMonth: number;
    totalExpensesPerYear: number;
  }
  
  const values = {
    property: {
      address: "3220 Bedford",
      city: "Amarillo",
      state: "TX",
      zipCode: "79103",
      bedrooms: "3",
      baths: "2",
      squareFeet: "1300",
      yearBuilt: "1965",
      otherInfo: "good conditions",
    },
    purchase: {
      askingPrice: "500000",
      offerPrice: "500000",
      downPaymentPercent: "3",
      estimatedClosingCostPercentage: "3",
      renovationCosts: "0",
      setupCosts: "10000",
    },
    income: {
      averageNightlyRate: "400",
      averageOccupancyPercentage: "75",
    },
    expenses: {
      loanTermInYears: "30",
      interestRatePercentage: "6",
      estimatedPropertyTaxesPerMonth: "150",
      estimatedInsuranceAmountPerMonth: "145",
      privateMortgageInsuranceAmountPerMonth: "86",
      monthlyHOAAmount: "0",
      estimatedMonthlyUtilitiesAmount: "300",
      cleaningFeeAmountPerMonth: "500",
      internetBillPerMonth: "100",
      maintenancePercentagePerMonth: "5",
      managementFeePercentagePerMonth: "0",
    },
  };

  const doCalcs = (values: {
    property?: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      bedrooms: string;
      baths: string;
      squareFeet: string;
      yearBuilt: string;
      otherInfo: string;
    };
    purchase: any;
    income: any;
    expenses: any;
  }) => {
    let calculations: Calculations = {
      // Initialization of properties
      downPaymentAmount: 0,
      estimatedClosingCostAmount: 0,
      totalInvestment: 0,
      grossIncomePerMonth: 0,
      grossIncomePerYear: 0,
      netOperatingIncome: 0,
      capRatePercentage: 0,
      cashFlowPerMonth: 0,
      cashFlowPerYear: 0,
      cashOnCashReturn: 0,
      mortgageAmount: 0,
      numberOfPayments: 0,
      monthlyPrinciplePlusInterest: 0,
      estimatedPropertyTaxesPerYear: 0,
      estimatedInsuranceAmountPerYear: 0,
      privateMortgageInsuranceAmountPerYear: 0,
      airBNBFeePercentagePerMonth: 0,
      airBNBFeePercentagePerYear: 0,
      maintenanceAmountPerMonth: 0,
      managementFeeAmountPerMonth: 0,
      operatingExpensesPerMonth: 0,
      operatingExpensesPerYear: 0,
      totalExpensesPerMonth: 0,
      totalExpensesPerYear: 0,
    };

    calculations.downPaymentAmount =
      parseInt(values.purchase.offerPrice) *
      (parseInt(values.purchase.downPaymentPercent) / 100);
    calculations.estimatedClosingCostAmount =
      parseInt(values.purchase.offerPrice) *
      (parseInt(values.purchase.estimatedClosingCostPercentage) / 100);
    calculations.totalInvestment =
      parseInt(values.purchase.setupCosts) +
      parseInt(values.purchase.renovationCosts) +
      calculations.estimatedClosingCostAmount +
      calculations.downPaymentAmount;

    // expenses calculations
    calculations.mortgageAmount =
      parseInt(values.purchase.offerPrice) - calculations.downPaymentAmount;
    calculations.numberOfPayments =
      parseInt(values.expenses.loanTermInYears) * 12;
    calculations.monthlyPrinciplePlusInterest =
      pmt(
        parseInt(values.expenses.interestRatePercentage) / 100 / 12,
        calculations.numberOfPayments,
        calculations.mortgageAmount
      ) * -1;
    calculations.estimatedPropertyTaxesPerYear =
      parseInt(values.expenses.estimatedPropertyTaxesPerMonth) * 12;
    calculations.estimatedInsuranceAmountPerYear =
      parseInt(values.expenses.estimatedInsuranceAmountPerMonth) * 12;
    calculations.privateMortgageInsuranceAmountPerYear =
      parseInt(values.expenses.privateMortgageInsuranceAmountPerMonth) * 12;

    calculations.grossIncomePerMonth =
      ((parseInt(values.income.averageNightlyRate) * 365) / 12) *
        (parseInt(values.income.averageOccupancyPercentage) / 100) +
      parseInt(values.expenses.cleaningFeeAmountPerMonth);

    calculations.airBNBFeePercentagePerMonth =
      calculations.grossIncomePerMonth * 0.03;
    calculations.airBNBFeePercentagePerYear =
      calculations.airBNBFeePercentagePerMonth * 12;
    calculations.maintenanceAmountPerMonth =
      ((parseInt(values.income.averageNightlyRate) * 365) / 12) *
      (parseInt(values.income.averageOccupancyPercentage) / 100) *
      (parseInt(values.expenses.maintenancePercentagePerMonth) / 100);
    calculations.managementFeeAmountPerMonth =
      ((parseInt(values.income.averageNightlyRate) * 365) / 12) *
      (parseInt(values.income.averageOccupancyPercentage) / 100) *
      (parseInt(values.expenses.managementFeePercentagePerMonth) / 100);

    calculations.operatingExpensesPerMonth =
      parseInt(values.expenses.estimatedPropertyTaxesPerMonth) +
      parseInt(values.expenses.estimatedInsuranceAmountPerMonth) +
      parseInt(values.expenses.privateMortgageInsuranceAmountPerMonth) +
      parseInt(values.expenses.monthlyHOAAmount) +
      parseInt(values.expenses.estimatedMonthlyUtilitiesAmount) +
      calculations.airBNBFeePercentagePerMonth +
      parseInt(values.expenses.cleaningFeeAmountPerMonth) +
      calculations.maintenanceAmountPerMonth +
      parseInt(values.expenses.internetBillPerMonth) +
      calculations.managementFeeAmountPerMonth;
    calculations.operatingExpensesPerYear =
      calculations.operatingExpensesPerMonth * 12;
    calculations.totalExpensesPerMonth =
      calculations.operatingExpensesPerMonth +
      calculations.monthlyPrinciplePlusInterest;
    calculations.totalExpensesPerYear = calculations.totalExpensesPerMonth * 12;

    // income calculations
    calculations.grossIncomePerYear = calculations.grossIncomePerMonth * 12;
    calculations.netOperatingIncome =
      calculations.grossIncomePerYear - calculations.operatingExpensesPerYear;
    calculations.capRatePercentage =
      (calculations.netOperatingIncome / parseInt(values.purchase.offerPrice)) *
      100;
    calculations.cashFlowPerMonth =
      calculations.grossIncomePerMonth - calculations.totalExpensesPerMonth;
    calculations.cashFlowPerYear = calculations.cashFlowPerMonth * 12;
    calculations.cashOnCashReturn = Math.ceil(
      (calculations.cashFlowPerYear / calculations.totalInvestment) * 100
    );

    console.log(calculations);
    return calculations;
  };

  const onAnalyzeClick = () => {
    console.log("Analyzing...");
    console.log(values); // Access the values from the global state

    // Perform calculations using doCalcs with state.amarillo.values
    const analysisResults = doCalcs(values);

    // Create a new analysis object
    const newAnalysis = {
      values: values,
      calculations: analysisResults,
    };

    const newId = uuidv4();

    updateData({
      ...data,

      analyses: {
        ...data.analyses,
        // Add your new analysis here (replace "new_analysis_id" with the new analysis ID)
        [newId]: newAnalysis,
      },
    })
    console.log("Analysis complete...", newAnalysis);
    console.log("ContextState: --- ", data);
  };

  return (
    <>
      <div className="min-h-full">
        <nav className="bg-indigo-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center text-white">
                GUS
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      href="#"
                      className="bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      STR
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* <!-- Profile dropdown --> */}
                  <div className="relative ml-3">
                    <div>
                      <button
                        type="button"
                        className="relative flex max-w-xs items-center rounded-full bg-indigo-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        onClick={handleDeleteCookie}
                        aria-haspopup="true"
                      >
                        Sign Out
                      </button>
                    </div>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                STR
              </a>
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
                      <div className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                      <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div className="flex justify-between">
                              {Object.entries(tabs).map(([key, value]) => (
                                <div
                                  key={value.name}
                                  onClick={() => tabSelect(key)}
                                >
                                  {value.name}
                                </div>
                              ))}{" "}
                            </div>
                            <div>
                              {Object.entries(values[currentTab]).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="flex justify-between p3 m4"
                                  >
                                    <div className="mr-5">{key}</div>
                                    <div>{value}</div>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="mt-5 sm:mt-6">
                              <button
                                type="button"
                                onClick={() => onAnalyzeClick()}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Analyze
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setIsNewModalOpen(!isNewModalOpen)
                                }
                                className="inline-flex w-full mt-2 justify-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Cancel
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
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
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
                        {Object.entries(data.analyses).map(([key, value]) => (
                          <tr key={key}>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                              {value.values.address}
                            </td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                              {value.calculations.totalInvestment}
                            </td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                              {value.calculations.netOperatingIncome}
                              </td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                              {value.calculations.cashOnCashReturn}
                              </td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                              {value.calculations.grossIncomePerYear}
                              </td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                              {value.calculations.totalExpensesPerYear}
                              </td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                              {value.calculations.cashFlowPerYear}
                              </td>
                            <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={openEditModal}
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))}
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
