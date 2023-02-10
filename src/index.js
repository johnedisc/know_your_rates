import { CurrencyService } from './js/Currency';
import './css/styles.css';

// UI Logic
const calculate = async (json,currency,quantity) => {
  console.log('hi',json,currency,quantity);
  printElements('number');
}

const handleAPI = async (baseCurrency) => {
  const response = await CurrencyService.currencyApiCall(baseCurrency);
  if (response) {
    calculate(response);
  } else {
    printError(response);
  }
}

const handleFormSubmission = (event) => {
  event.preventDefault();
  let quantity = document.querySelector('#quantity').value;
  document.querySelector('#quantity').value = null;
  calculate(handleAPI(),'EEU',quantity);
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
