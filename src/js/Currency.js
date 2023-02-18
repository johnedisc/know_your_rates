
export class CurrencyService {
  
  static async currencyApiCall(baseCurrency) {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${baseCurrency}`);
    return this.parseJSON(response);
  }

  static async fetchData(code) {
    try {
      if (code === '') {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
      }
      const jsonResponse = await fetch.json();
      if (!fetch.ok) {
        const errMsg = `${fetch.status}, ${jsonResponse['error-type']}`; 
        return errMsg;
      } else {
        return jsonResponse;
      }
    } catch (error) {

      return error;
    }
  }
}

export class CurrencyTransaction {
  constructor(baseCurrency,targetCurrency,quantity) {
    this.baseCurrency = baseCurrency;
    this.targetCurrency = targetCurrency;
    this.quantity = quantity;
  }
}
