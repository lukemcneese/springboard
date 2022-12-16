import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {

  static async get(items) {
    const result = await axios.get(`${BASE_API_URL}/${items}`);
    return result.data;
  }
  static async set(items, menuType){
    const result = await axios.post(`${BASE_API_URL}/${menuType}`,items);
    console.log(result);
  }

}

export default SnackOrBoozeApi;
