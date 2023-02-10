import { CurrencyService } from './js/className';
import './css/styles.css';

// UI Logic

const handleAPI = async (baseCurrency) => {
  const response = await CurrencyService.currencyApiCall(baseCurrency);
  if (response) {
    printElements(response);
  } else {
    printError(response);
}

const handleFormSubmission = (event) => {
  event.preventDefault();
  const input = document.querySelector().value;
  document.querySelector().value = null;
  handleAPI(input);
}

const printElements = (results) => {
}

const printError = (error) => {
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
