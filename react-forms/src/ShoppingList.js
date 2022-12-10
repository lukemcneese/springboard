import React,{useState} from "react";
import Item from "./Item"
import NewItemForm from "./NewItemForm";



const ShoppingList = () =>{

const LIST = [
    {id: 1, name: "Chucnky PB", qty : 5},
    {id: 2, name: "Creamy PB", qty : 1}
]
const [items, setItems] = useState(LIST)


return (
    <div>
        <h3>Shopping List</h3>
        <NewItemForm/>
        <div>
            {items.map(({name, qty, id}) =><Item name={name} qty={qty} key={id}/>)}
        </div>
    </div>
)
}
export default ShoppingList;