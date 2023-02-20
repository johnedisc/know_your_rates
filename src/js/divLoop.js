import { CurrencyService } from './Currency'
import { printError } from '../index.js'

export async function divLoop(event) {
  const currencyApi = await CurrencyService.fetchData();
  if (!currencyApi['supported_codes']) {
    return printError(currencyApi);
  }
  const codeArr = currencyApi['supported_codes'];
  return print(event,codeArr);
}

const print = (divDestination,responseFromApi) => {
  const baseEl = document.getElementById('baseCurrency');
  const targetEl = document.getElementById('targetCurrency');
  if (divDestination.target.id === "baseCurrencyBtn") {
    responseFromApi.map(el => {
      let divEl = document.createElement('div');
      divEl.append(el[1]);
      divEl.setAttribute('value',el[0]);
      baseEl.append(divEl);
    });
  } else {
    responseFromApi.map(el => {
      let divEl = document.createElement('div');
      divEl.append(el[1]);
      divEl.setAttribute('value',el[0]);
      targetEl.append(divEl);
    });
  }
}
