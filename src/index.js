import { CurrencyService, CurrencyTransaction } from './js/Currency';
import './css/styles.css';

// UI Logic
const calculate = async (jsonfiedResponse,transactionObj) => {
  console.log(jsonfiedResponse);
  console.log(transactionObj);
  printElements('number');
}

const handleAPI = async (transactionObj) => {
  const response = await CurrencyService.currencyApiCall(transactionObj.baseCurrency);
  if (response) {
    calculate(response,transactionObj);
  } else {
    printError(response);
  }
}

const handleFormSubmission = (event) => {
  event.preventDefault();
  // read in usr data from form
  let quantityVal = document.querySelector('#quantity').value;
  let baseCurrencyVal = document.querySelector('#baseCurrency').value;
  let targetCurrencyVal = document.querySelector('#targetCurrency').value;
  document.querySelector('#quantity').value = null;
  document.querySelector('#baseCurrency').value = null;
  document.querySelector('#targetCurrency').value = null;

  // store usr data in object
  const transaction = new CurrencyTransaction(quantityVal,baseCurrencyVal,targetCurrencyVal);
  handleAPI(transaction);
}

const printElements = (results) => {
  return results;
}

const printError = (error) => {
  return error;
}

window.addEventListener('load', () => {
  document.querySelector('form').addEventListener('submit', handleFormSubmission);
});
