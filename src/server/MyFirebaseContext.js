// context/FirebaseContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, firestoreDB, getDoc, doc } from './firebase';
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";


const FirebaseContext = createContext();

export const useFirebase = () => {
    return useContext(FirebaseContext);
};



export const FirebaseProvider = ({ children }) => {

    const [data, setData] = useState(
        {
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
                                grossIncomePerMonth: 22,
                                grossIncomePerYear: 333,
                                netOperatingIncome: 555,
                                capRatePercentage: "",
                                cashFlowPerMonth: 22,
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
                                downPaymentAmount: 333,
                                estimatedClosingCostAmount: 333,
                                totalInvestment: 20000,
                                grossIncomePerMonth: 333,
                                grossIncomePerYear: 333,
                                netOperatingIncome: 555,
                                capRatePercentage: 333,
                                cashFlowPerMonth: 333,
                                cashFlowPerYear: 9999,
                                cashOnCashReturn: 13,
                                mortgageAmount: 333,
                                numberOfPayments: 333,
                                monthlyPrinciplePlusInterest: 333,
                                estimatedPropertyTaxesPerYear: 333,
                                estimatedInsuranceAmountPerYear: 333,
                                privateMortgageInsuranceAmountPerYear: 333,
                                airBNBFeePercentagePerMonth: 333,
                                airBNBFeePercentagePerYear: 333,
                                maintenanceAmountPerMonth: 333,
                                managementFeeAmountPerMonth: 333,
                                operatingExpensesPerMonth: 333,
                                operatingExpensesPerYear: 333,
                                totalExpensesPerMonth: 333,
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


    const router = useRouter();

    let newData = ''

    
    
    const fetchDataFromFirebase = async () => {
        let decodedToken = '';
        const userCookie = Cookies.get("gusvega_cookie");
    
        if (userCookie) {
            const token = userCookie;
            decodedToken = jwt.decode(token);
    
            try {
                const collectionPath = "users";
                const documentRef = doc(collection(firestoreDB, collectionPath), decodedToken.user_id);
                const querySnapshot = await getDoc(documentRef);
    
                if (querySnapshot.exists()) {
                    setData(querySnapshot.data());
                    newData = data
                } else {
                    console.log("Document does not exist");
                }
            } catch (error) {
                console.error('Error fetching data from Firebase: ', error);
            }
        } else {
            console.log("Cookie not found");
        }
    };

    useEffect(() => {
        fetchDataFromFirebase();
        
    }, []);

    const updateData = (newData) => {
        setData(newData);
    };

    return (
        <FirebaseContext.Provider value={{ data, updateData, fetchDataFromFirebase }}>
            {children}
        </FirebaseContext.Provider>
    );
};
