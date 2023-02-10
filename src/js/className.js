export class ClassName {
  static async staticMethod(query) {
    try {
      const response = await fetch(`?q=${query}${process.env.API_KEY}`);
      const jsonResponse = await response.json();
      if (!response.ok) {
        const errMessage = `${response.status} ${response.statusText}`; 
        return errMessage;
      } else {
        return jsonResponse;
      }
    } catch (error) {
      
      return error;
    }
  }
}
