export class CurrencyService {
  static async currencyApiCall(baseCurrency) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${baseCurrency}`);
      const jsonResponse = await response.json();
      if (!response.ok) {
        const errMsg = `${response.status}, ${jsonResponse['error-type']}`; 
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
