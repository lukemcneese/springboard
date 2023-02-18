import React, {useState, useContext, useEffect} from "react";
import CocktailAPI from "./CocktailAPI";
import UserContext from "./UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';


const Rating = ({idDrink}) =>{
    const {currentUser} = useContext(UserContext)
    const [ratingId, setRatingId] = useState(null)
    const [ratingValue, setRatingValue] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(function loadUserCocktailRating() {
        console.debug("App useEffect loadUserCocktailRating");
    
        async function getUserCocktailRating() {
          if (currentUser) {
            try {
              let userRating = await CocktailAPI.getUserCocktailRating(currentUser.username, idDrink);
              setRatingId(userRating.id);
              setRatingValue(userRating.rating);
            } catch (err) {
              console.error("App loadUserCocktailRating: problem loading", err);
            }
          }
          setIsLoading(false);
        }
    
        // set isLoading to ture while async getUserCocktailRating runs; once the
        // data is fetched (or even if an error happens!), this will be set back
        // to true to control the spinner.
        setIsLoading(true);
        getUserCocktailRating();
      }, [currentUser,idDrink]);

      

    async function handleSubmit(evt){
        evt.preventDefault();
        const data = {
            username: currentUser.username,
            rating: +ratingValue,
            cocktailId: +idDrink,
        }
        let res = {};
        if(ratingId){
            res = await CocktailAPI.updateRating(currentUser.username,ratingId,{rating:+ratingValue})
        }else{
            res = await CocktailAPI.createRating(currentUser.username,data)
        }
        setRatingId(res.id)
    }
    function handleChange(evt){
        const {value} = evt.target;
        setRatingValue(value);
    }
    if (isLoading) {
        return <p>Loading page;</p>;
      }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>Rating:
                <select name="rating" id="rating" value={ratingValue} onChange={handleChange}>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </label>
            <input type="submit" value="Submit"className="btn btn-primary"/>
        </form>
    );//add Ternary Operator for Submit/Update on the text of the submit box
}
export default Rating