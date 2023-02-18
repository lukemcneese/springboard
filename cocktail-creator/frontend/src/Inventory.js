import React, {useState, useEffect, useContext} from "react";
import Ingredient from "./Ingredient"
import CocktailAPI from "./CocktailAPI";
import LoadingSpinner from "./LoadingSpinner"
import UserContext from "./UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import IngredientForm from "./IngredientForm";

function Inventory(){
    const [inventory, setInventory] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const {currentUser} = useContext(UserContext)


    useEffect(function loadUserInventory() {
        console.debug("App useEffect loadUserInventory");
    
        async function getInventoryOnMount() {
            if (currentUser) {
                try {
                    let inventoryDB = await CocktailAPI.getUserInventory(currentUser.username);
                    setInventory(inventoryDB);
                } catch (err) {
                console.error("App getInventoryOnMount: problem loading", err);
                }
            }
            setIsLoading(false);
            }
            setIsLoading(true);
            getInventoryOnMount();
      }, [currentUser]);

    //updates the ingredients in Inventory
    const handleIngredientSubmit = async function (ingredient){
        let newInventoryItem = await CocktailAPI.createInventory(currentUser.username,{ingredient:ingredient, quantity:1,username:currentUser.username})
        const tempArray = [...inventory];
        tempArray.push(newInventoryItem);
        setInventory(tempArray);
    };


    async function handleClick(evt) {
        evt.preventDefault();
        const inventoryID = +evt.target.id;
        const action = evt.target.name;
        const ingredientIndex = inventory.findIndex( obj => obj.id === inventoryID);
        const ingredient = inventory[ingredientIndex];
        
        //get the current quantity of inventory and update.
        let newQuantity = ingredient.quantity;
        if (action === "add"){ newQuantity ++;}
        else if(action === "remove"){ newQuantity --;}

        const tempArray = [...inventory]
        //remove from DB if remove is clicked again after inventory is 0
        if (newQuantity === -1){ 
            await CocktailAPI.deleteInventory(currentUser.username, inventoryID);
            tempArray.splice(ingredientIndex,1);
        }else{
            await CocktailAPI.updateInventory(currentUser.username, inventoryID, newQuantity);
            tempArray[ingredientIndex].quantity = newQuantity
        }
        //update state
        setInventory(tempArray)
      }

    if (isLoading) return <LoadingSpinner />;
     return (
        <>
            
             {inventory.length
                ? 
                (<div className="container-fluid">
                    <div className="row">
                        {inventory.map(({id, ingredient, quantity}) =>(
                        <Ingredient
                            key={id}
                            id = {id} 
                            ingredient={ingredient}
                            quantity={quantity}
                            handleClick= {handleClick}
                        />
                        ))} 
                    </div>
                </div>) : <p> Add some Ingredients to your Inventory</p>}
            <IngredientForm handleIngredientSubmit={handleIngredientSubmit}/>
        </>
      );
  }
  export default Inventory;