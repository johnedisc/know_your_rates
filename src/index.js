import { CurrencyService, CurrencyTransaction } from './js/Currency';
//import bgImg from './wallTexture.jpg'
import { divLoop } from './js/divLoop'
import './css/styles.css';

const calculate = (jsonfiedResponse,transactionObj) => {
  const convertedTotal = jsonfiedResponse['conversion_rates'][transactionObj.targetCurrency] * transactionObj.quantity;
  const twoDecimals = Math.floor(convertedTotal * 100) / 100;
  return twoDecimals;
}

const handleAPI = async (transactionObj) => {
  const response = await CurrencyService.currencyApiCall(transactionObj.baseCurrency);
  if (response) {
    transactionObj.convertedValue = await calculate(response,transactionObj);
    printElements(transactionObj);
  } else {
    printError(response);
  }
}

// UI Logic
const handleFormSubmission = (event) => {
  event.preventDefault();
  console.log(event);
  // read in usr data from form
  let quantityVal = parseInt(document.querySelector('#quantity').value);
  let baseCurrencyVal = document.querySelector('#baseCurrencySelectElement').value;
  let targetCurrencyVal = document.querySelector('#targetCurrencySelectElement').value;
  document.querySelector('#quantity').value = null;
  document.querySelector('#baseCurrencySelectElement').value = null;
  document.querySelector('#targetCurrencySelectElement').value = null;

  // store usr data in object
  const transaction = new CurrencyTransaction(baseCurrencyVal,targetCurrencyVal,quantityVal);
  console.log(transaction);
  handleAPI(transaction);
};

const printElements = (transactionObj) => {
  document.querySelector('#baseCurrency').innerText = '';
  document.querySelector('#targetCurrency').innerText = '';
  document.querySelector('#response').innerText = `the converted value is ${transactionObj.convertedValue} ${transactionObj.targetCurrency} from ${transactionObj.quantity} ${transactionObj.baseCurrency}`;
};

const printError = (error) => {
  document.querySelector('#response').innerText = error;
};

window.addEventListener('load', () => {

  document.getElementById('baseCurrencyBtn').addEventListener('click', divLoop);
  document.getElementById('targetCurrencyBtn').addEventListener('click', divLoop);
  const baseCurrencyOptions = document.querySelectorAll('#baseCurrency');
  const targetCurrencyOptions = document.querySelectorAll('#targetCurrency');

  baseCurrencyOptions.forEach(el => {
    el.addEventListener('click', event => {
      const selectEl = document.createElement('select');
      selectEl.append(event.target);
      selectEl.setAttribute('id','baseCurrencySelectElement');
      document.querySelector('form').append(selectEl);
    });
  });

targetCurrencyOptions.forEach(el => {
    el.addEventListener('click', event => {
      const selectEl = document.createElement('select');
      selectEl.append(event.target);
      selectEl.setAttribute('id','targetCurrencySelectElement');
      document.querySelector('form').append(selectEl);
    });
  });
  
  document.querySelector('#formBtn').addEventListener('click', () => {
    try {
      if (!document.querySelector('select#baseCurrencySelectElement') || !document.querySelector('select#targetCurrencySelectElement')) {
        throw new Error('please select a base currency and a target currency before submitting your request'); 
      } else if (!document.querySelector('input').value) {
        throw new Error('please enter a quantity');
      }
      handleFormSubmission(event);
    } catch (error) {
      printError(error);
    }
  });

});
