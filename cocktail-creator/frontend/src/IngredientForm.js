import React, {useEffect, useState} from "react";
import Autocomplete from "react-autocomplete"
import CocktailAPI from "./CocktailAPI";
import LoadingSpinner from "./LoadingSpinner";
import {v4 as uuid} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

const IngredientForm = ({handleIngredientSubmit}) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [ingredient, setIngredient] = useState('');
    const [ingredientsArray, setIngredientArray] = useState(null);
    //Load Values from API on load
    useEffect(function loadAPIIngredient() {
        console.debug("App useEffect loadUserInventory");
    
        async function getIngredientsOnMount() {
                try {
                    const arr = await CocktailAPI.getIngredients();
                    setIngredientArray(arr);
                } catch (err) {
                    console.error("App getIngredientsOnMount: problem loading", err);
                }
                setIsLoading(false);
            }
            setIsLoading(true);
            getIngredientsOnMount();
      }, []);
    function handleSubmit(evt){
        evt.preventDefault();
        handleIngredientSubmit(ingredient)
    }
    let handleChange = (evt) =>{
        setIngredient(evt.target.value)
    }

    if (isLoading) return <LoadingSpinner />;
    return (
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    getItemValue={(item) => item.label}
                    items={ingredientsArray}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                        </div>}
                    renderMenu={item => (
                    <div className="dropdown">
                        {item}
                    </div>
                    )}
                    value={ingredient}
                    key={`${ingredient}${uuid()}`}
                    onChange={handleChange}
                    onSelect={(val) => setIngredient(val)}
                />
                <button className="submit" type="submit">Submit</button>
            </form>
    );
}
export default IngredientForm