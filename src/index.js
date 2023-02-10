import { CurrencyService, CurrencyTransaction } from './js/Currency';
//import bgImg from './wallTexture.jpg'
import './css/styles.css';

const calculate = async (jsonfiedResponse,transactionObj) => {
  const convertedTotal = jsonfiedResponse['conversion_rates'][transactionObj.targetCurrency] * transactionObj.quantity;
  const twoDecimals = Math.floor(convertedTotal * 100) / 100;
  printElements(twoDecimals);
}

const handleAPI = async (transactionObj) => {
  const response = await CurrencyService.currencyApiCall(transactionObj.baseCurrency);
  console.log(response);
  if (response) {
    calculate(response,transactionObj);
  } else {
    printError(response);
  }
}

// UI Logic
const handleFormSubmission = (event) => {
  event.preventDefault();
  // read in usr data from form
  let quantityVal = document.querySelector('#quantity').value;
//  let baseCurrencyVal = document.querySelector('#baseCurrency').value;
//  let targetCurrencyVal = document.querySelector('#targetCurrency').value;
  document.querySelector('#quantity').value = null;
  document.querySelector('#baseCurrency').value = null;
  document.querySelector('#targetCurrency').value = null;

  // store usr data in object
  const transaction = new CurrencyTransaction('USD','EUR',quantityVal);
  console.log(transaction);
  handleAPI(transaction);
}

const printElements = (results) => {
  document.querySelector('#response').innerText = results;
}

const printError = (error) => {
  return error;
}

window.addEventListener('load', () => {
  document.querySelector('form').addEventListener('submit', handleFormSubmission);
});
