import { CurrencyService } from './Currency'
import { printError } from '../index.js'

export async function divLoop(event) {
  const response = await CurrencyService.fetchData();
  console.log(response);
  if (!response['supported_codes']) {
    return printError(response);
  }
  const codeArr = response['supported_codes'];
  return print(event,codeArr);
}

const print = (divDestination,response) => {
  const baseEl = document.getElementById('baseCurrency');
  const targetEl = document.getElementById('targetCurrency');
  if (divDestination.target.id === "baseCurrencyBtn") {
    response.map(el => {
      let optionEl = document.createElement('option');
      optionEl.append(el[1]);
      optionEl.setAttribute('value',el[0]);
      baseEl.append(optionEl);
    });
  } else {
    response.map(el => {
      let optionEl = document.createElement('option');
      optionEl.append(el[1]);
      optionEl.setAttribute('value',el[0]);
      targetEl.append(optionEl);
    });
  }
}
