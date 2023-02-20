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
  const response = await CurrencyService.fetchData(transactionObj.baseCurrency);
  if (response) {
    transactionObj.convertedValue = await calculate(response,transactionObj);
    printElements(transactionObj);
  } else {
    printError(response);
  }
}

// UI Logic
const handleFormSubmission = (transaction) => {
  event.preventDefault();
  // read in usr data from form
  transaction.quantity = parseInt(document.querySelector('#quantity').value);
  document.querySelector('#quantity').value = null;
  
  console.log(transaction);
  handleAPI(transaction);
  const grabSelectEl = document.querySelectorAll('form > select');
  console.log(grabSelectEl);
  grabSelectEl.forEach(el => el.parentElement.removeChild(el));
};

export const printElements = (transactionObj) => {
  document.querySelector('#baseCurrency').innerText = '';
  document.querySelector('#targetCurrency').innerText = '';
  document.querySelector('#response').innerText = `the converted value is ${transactionObj.convertedValue} ${transactionObj.targetCurrency} from ${transactionObj.quantity} ${transactionObj.baseCurrency}`;
};

export const printError = (error) => {
  document.querySelector('#response').innerText = error;
};

window.addEventListener('load', () => {

  // store usr data in object
  const transaction = new CurrencyTransaction();

  document.getElementById('baseCurrencyBtn').addEventListener('click', divLoop);
  document.getElementById('targetCurrencyBtn').addEventListener('click', divLoop);
  const baseCurrencyOptions = document.querySelectorAll('#baseCurrency');
  const targetCurrencyOptions = document.querySelectorAll('#targetCurrency');

  baseCurrencyOptions.forEach(el => {
    
    el.addEventListener('click', event => {
      if (!transaction.baseCurrency) {
        event.target.classList.add('selected');
        const selectEl = document.createElement('select');
        const optionEl = document.createElement('option');
        optionEl.setAttribute('value',`${event.target.attributes[0].value}`);
        optionEl.classList.add('baseCurrency');
        selectEl.append(optionEl);
        selectEl.setAttribute('id','baseCurrencySelectElement');
        document.querySelector('form').append(selectEl);
        transaction.baseCurrency = event.target.attributes[0].value;
      }
    });
  });

  targetCurrencyOptions.forEach(el => {
    el.addEventListener('click', event => {
      if (!transaction.targetCurrency) {
        event.target.classList.add('selected');
        const selectEl = document.createElement('select');
        const optionEl = document.createElement('option');
        optionEl.setAttribute('value',`${event.target.attributes[0].value}`);
        optionEl.classList.add('targetCurrency');
        selectEl.append(optionEl);
        selectEl.setAttribute('id','targetCurrencySelectElement');
        document.querySelector('form').append(selectEl);
        transaction.targetCurrency = event.target.attributes[0].value;
      }
    });
  });

  document.querySelector('#formBtn').addEventListener('click', () => {
    if (!document.querySelector('select#baseCurrencySelectElement') || !document.querySelector('select#targetCurrencySelectElement')) {
      let errSelect = new Error('please select a base currency and a target currency before submitting your request');
      printError(errSelect); 
    } else if (!document.querySelector('input').value) {
      let errInput = new Error('please enter a quantity')
      printError(errInput); 
    }
    handleFormSubmission(transaction);
  });

});
