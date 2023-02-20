
export class CurrencyService {

  static async fetchData(code) {
    try {
      let apiResponse;
      //countryCode or convert numbers
      if (!code) {  
        apiResponse = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`);
        console.log(apiResponse);
      } else {
        apiResponse = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${code}`);
      }
      const jsonfiedResponse = await apiResponse.json();

      if (jsonfiedResponse.result === "error") {
        const errMsg = `${apiResponse.status}, ${jsonfiedResponse['error-type']}`; 
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
