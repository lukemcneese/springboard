import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class CocktailAPI {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get", db="theCocktailDB") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    if (db === "cocktailCreatorDB"){
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${CocktailAPI.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
        let response = (await axios({ url, method, data, params, headers })).data
        return response;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }else if (db === "theCocktailDB"){
        const cocktailUrl = "https://www.thecocktaildb.com/api/json/v2/"
        const apiKEY = "9973533/"
        if (method !== "get") console.error("API Error: only GET Methods allowed for CocktailDB")
        try {
            const url = cocktailUrl + apiKEY + endpoint +".php";
            const params = (method === "get")
            ? data
            : {};
            const resp = (await axios({url, params})).data;
            return resp;
        } catch (err){
            console.error("API Error:", err.response);
        }
    }
  }


  // Individual API routes

  static async getRandom(){
      let res = await this.request("random","random", "get", "theCocktailDB")
      return res.drinks[0];
  }

  static async getCocktailsName(name="") {
    if (name === ""){
      let res =  await this.getRandom();
      return res;
    }
    let res = await this.request("search", {"s":name}, "get", "theCocktailDB");
    return res.drinks;
    //eventually request the local DB as well and append the results and add some sort of rank??
  }
  static async getCocktail(id) {
    let res = await this.request("lookup", {"i":id}, "get", "theCocktailDB");
    return res.drinks[0];
  }


  /** Handle Logging and and Profile API Calls*/
  static async signup(data){
    let res = await this.request('auth/register', data, "post", "cocktailCreatorDB");
    return res.token
  }
  static async login(data){
    let res = await this.request('auth/token', data, "post", "cocktailCreatorDB");
    return res.token;
  }
  static async getCurrentUser(username){
    let res = await this.request(`users/${username}`,{}, "get", "cocktailCreatorDB");
    return res.user;
  }
  static async saveProfile(username, data){
    let res = await this.request(`users/${username}`,data, "patch", "cocktailCreatorDB");
    return res.user;
  }

}

// for now, put token ("testuser" / "password" on class)
CocktailAPI.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
export default CocktailAPI