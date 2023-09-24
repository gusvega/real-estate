import { createContext, useState, useContext, useEffect } from 'react';
import { db } from './firebase';
import {
   getFirestore,
   collection,
   addDoc,
   setDoc,
   getDoc,
   doc,
 } from "firebase/firestore";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {

   // let decodedToken = ''

   // const userCookie = Cookies.get("gusvega_cookie");
   // if (userCookie) {
   //    const token = userCookie;
   //    decodedToken = jwt.decode(token);
   //    // router.push("/home");
   // } else {
   //    console.log("Cookie not found");
   // }

   // const usersCollectionRef = collection(db, "users");
   // const documentRef = doc(usersCollectionRef, decodedToken.user_id);

   // const [data, setData] = useState(null);

   // useEffect(() => {
   //    getDoc(documentRef)
   //       .then((docSnapshot) => {
   //          if (docSnapshot.exists()) {
   //             const firebaseData = docSnapshot.data();
   //             console.log("Document data:", firebaseData);

   //             myData = firebaseData
   //             console.log('MyData', myData)
   //             setData(myData)
   //             console.log('Data', data)
   //          } else {
   //             console.log("No such document!");
   //             setData(null);
   //          }
   //       })
   //       .catch((error) => {
   //          console.error("Error getting document:", error);
   //          setData(null);
   //       })

   // }, []);

   const [data, setData] = useState({
      firstName: "GUSTAVO",
      lastName: "",
      email: "",
      UID: "",
      admin: false,
      analyses: {
         properties: {
            '000': {
               id: '1',
               values: {
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
               },
               calculations: {
                  downPaymentAmount: "",
                  estimatedClosingCostAmount: "",
                  totalInvestment: 20000,
                  grossIncomePerMonth: "",
                  grossIncomePerYear: 333,
                  netOperatingIncome: 555,
                  capRatePercentage: "",
                  cashFlowPerMonth: "",
                  cashFlowPerYear: 9999,
                  cashOnCashReturn: 13,
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
                  totalExpensesPerYear: 444
               },
            }
         },
         neighborhoods: {
            'belmar': {
               properties: {
                  '002': {
                     id: '1',
                     values: {
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
                     },
                     calculations: {
                        downPaymentAmount: "",
                        estimatedClosingCostAmount: "",
                        totalInvestment: 20000,
                        grossIncomePerMonth: "",
                        grossIncomePerYear: 333,
                        netOperatingIncome: 555,
                        capRatePercentage: "",
                        cashFlowPerMonth: "",
                        cashFlowPerYear: 9999,
                        cashOnCashReturn: 13,
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
                        totalExpensesPerYear: 444
                     },
                  }
               }
            }
         },
         zipCodes: {
            'zipCode1': {
               properties: {
                  '003': {
                     id: '1',
                     values: {
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
                     },
                     calculations: {
                        downPaymentAmount: "",
                        estimatedClosingCostAmount: "",
                        totalInvestment: 20000,
                        grossIncomePerMonth: "",
                        grossIncomePerYear: 333,
                        netOperatingIncome: 555,
                        capRatePercentage: "",
                        cashFlowPerMonth: "",
                        cashFlowPerYear: 9999,
                        cashOnCashReturn: 13,
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
                        totalExpensesPerYear: 444
                     },
                  }
               }

            }
         },
         cities: {
            'city1': {
               properties: {
                  '004': {
                     id: '1',
                     values: {
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
                     },
                     calculations: {
                        downPaymentAmount: "",
                        estimatedClosingCostAmount: "",
                        totalInvestment: 20000,
                        grossIncomePerMonth: "",
                        grossIncomePerYear: 333,
                        netOperatingIncome: 555,
                        capRatePercentage: "",
                        cashFlowPerMonth: "",
                        cashFlowPerYear: 9999,
                        cashOnCashReturn: 13,
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
                        totalExpensesPerYear: 444
                     },
                  }
               }
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