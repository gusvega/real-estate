import { createContext, useState, useContext } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
   const [data, setData] = useState({
      firstName: "GUSTAVO",
      lastName: "",
      email: "",
      UID: "",
      admin: false,
      analyses: {
         amarillo: {
            values: {
               // property values
               address: "3220 Bedford",
               city: "Amarillo",
               state: "TX",
               zipCode: "79103",
               bedrooms: "3",
               baths: "2",
               squareFeet: "1300",
               yearBuilt: "1965",
               otherInfo: "good conditions",

               // purchase values
               askingPrice: "500000",
               offerPrice: "500000",
               downPaymentPercent: "3",
               estimatedClosingCostPercentage: "3",
               renovationCosts: "0",
               setupCosts: "10000",

               // income values
               averageNightlyRate: "400",
               averageOccupancyPercentage: "75",

               // expenses values
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
            calculations: {
               downPaymentAmount: "",
               estimatedClosingCostAmount: "",
               totalInvestment: "",

               // income calculations
               grossIncomePerMonth: "",
               grossIncomePerYear: "",
               netOperatingIncome: "",
               capRatePercentage: "",
               cashFlowPerMonth: "",
               cashFlowPerYear: "",
               cashOnCashReturn: "",

               // expenses calculations
               mortgageAmount: "",
               numberOfPayments: "",
               monthlyPrinciplePlusInterest: "",
               estimatedPropertyTaxesPerYear: "",
               estimatedInsuranceAmountPerYear: "",
               privateMortgageInsuranceAmountPerYear: "",
               airBNBFeePercentagePerMonth: "",
               airBNBFeePercentagePerYear: "",
               maintenanceAmountPerMonth: "",
               managementFeeAmountPerMonth: "",

               operatingExpensesPerMonth: "",
               operatingExpensesPerYear: "",
               totalExpensesPerMonth: "",
               totalExpensesPerYear: "",
            },
         },
      },
   });

   const updateData = (newData) => {
      setData(newData);
   };

   return (
      <MyContext.Provider value={{ data, updateData }}>
         {children}
      </MyContext.Provider>
   );
};

const useMyContext = () => useContext(MyContext);

export { MyContextProvider, useMyContext };