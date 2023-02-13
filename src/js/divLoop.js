import { CurrencyService } from './Currency'

export async function divLoop(event) {
  const response = await CurrencyService.countryCode();
  console.log(response);
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
