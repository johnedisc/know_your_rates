
export class CurrencyService {

//  static async currencyApiCall(baseCurrency) {
//    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${baseCurrency}`);
//    return this.parseJSON(response);
//  }
//
//  static async countryCode() {
//    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
//    return this.parseJSON(response);
//  }

  static async fetchData(code) {
    try {
      let response;
      //countryCode or convert numbers
      if (!code) {  
        response = await fetch(`https://v.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
      } else {
        response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${code}`);
      }
      const jsonfiedResponse = await response.json();

      if (jsonfiedResponse.result === "error") {
        const errMsg = `${response.status}, ${jsonfiedResponse['error-type']}`; 
        throw new Error(errMsg);
      } else {
        return jsonfiedResponse
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
