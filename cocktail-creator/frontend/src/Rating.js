import React, {useState, useContext} from "react";
import CocktailAPI from "./CocktailAPI";
import UserContext from "./UserContext";


const Rating = ({idDrink}) =>{
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {ratingID, setRatingID} = useState(null)
    const {ratingValue, setRatingValue} = useState(0)


    //check to see if the user has a rating for this drink ID and render that as the ratingValue
    // setRatingID( await CocktailAPI.getUserCocktailRating(currentUser.username, idDrink)
    
    
    async function handleSubmit(evt){
        evt.preventDefault();
        const data = {
            username: currentUser.username,
            rating: ratingValue,
            cocktailId: idDrink,
        }
        const res = await CocktailAPI.createRating(currentUser.username,data)
        setRatingID(res.id)

    }
    function handleChange(evt){
        const {value} = evt.target;
        setRatingValue(value);
    }
    return (
        <form onSubmit={handleSubmit()}>
            <label>Rating:
                <select name="rating" id="rating" value={{ratingValue}} onChange={{handleChange}}>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={4}>4</option>
                </select>
            </label>
            <input type={submit} value={Submit}/>
        </form>
    );
}
export default Rating