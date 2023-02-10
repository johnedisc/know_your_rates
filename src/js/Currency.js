export class Currency {
  static async apiCall(baseCurrency) {
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
