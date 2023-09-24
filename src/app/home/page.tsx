"use client";

import { useState } from 'react'
import Property from '../home/components/property'

import { useMyContext } from "../../server/MyContext";

import Navigation from "./components/navigation";
import NewAnalysisModal from './components/newAnalysisModal';

export default function HomePage() {

  const { data, updateData } = useMyContext();

  // console.log('DATA: ', data);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const tabs = [
    { name: 'Properties', id: 'properties', href: '#', count: data.analyses['properties'].length, current: false },
    { name: 'Neighborhoods', id: 'neighborhoods', href: '#', count: data.analyses['properties'].length, current: true },
    { name: 'Zip Codes', id: 'zipCodes', href: '#', count: data.analyses['zipCodes'].length, current: false },
    { name: 'Cities', id: 'cities', href: '#', count: data.analyses['cities'].length, current: false },
  ]

  const [activeTab, setActiveTab] = useState('properties')

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  interface Values {
    property: {
      address: any;
      city: any;
      state: any;
      zipCode: any;
      bedrooms: any;
      baths: any;
      squareFeet: any;
      yearBuilt: any;
      otherInfo: any;
    };
    purchase: {
      askingPrice: any;
      offerPrice: any;
      downPaymentPercent: any;
      estimatedClosingCostPercentage: any;
      renovationCosts: any;
      setupCosts: any;
    };
    income: {
      averageNightlyRate: any;
      averageOccupancyPercentage: any;
    };
    expenses: {
      loanTermInYears: any;
      interestRatePercentage: any;
      estimatedPropertyTaxesPerMonth: any;
      estimatedInsuranceAmountPerMonth: any;
      privateMortgageInsuranceAmountPerMonth: any;
      monthlyHOAAmount: any;
      estimatedMonthlyUtilitiesAmount: any;
      cleaningFeeAmountPerMonth: any;
      internetBillPerMonth: any;
      maintenancePercentagePerMonth: any;
      managementFeePercentagePerMonth: any;
    };
    [key: string]: any; // Index signature
  }

  const [values, setValues] = useState<Values>({
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
  });

  return (
    <>
      <div className="min-h-full">

        <Navigation />

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
              <div className="sm:flex sm:items-center mb-5">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Properties
                  </h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => openModal()}
                  >
                    New Analysis
                  </button>

                  <NewAnalysisModal newData={values} isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} />

                </div>
              </div>

              <div>

                <div className="hidden sm:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                      {tabs.map((tab) => (
                        <a
                          key={tab.name}
                          onClick={() => handleTabClick(tab.id)}
                          className={classNames(
                            tab.id === activeTab
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                            'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                          )}
                          aria-current={tab.id === activeTab ? 'page' : undefined}
                        >
                          {tab.name}
                          {tab.count ? (
                            <span
                              className={classNames(
                                tab.id === activeTab ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                                'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block'
                              )}
                            >
                              {tab.count}
                            </span>
                          ) : null}
                        </a>
                      ))}
                    </nav>
                  </div>
                  {/* Table Content */}
                  <ul role="list" className="divide-y divide-gray-100">
                    {Object.keys(data.analyses[activeTab]).map((analysis) => (
                      <div key={analysis}>
                        <Property analysis={analysis} />
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
