export class CurrencyService {
  static async currencyApiCall() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
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
