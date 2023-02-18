import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cocktail = ({idDrink, strDrink, strDrinkThumb, strCategory}) =>{
    return (
    <Link to={`/cocktails/${idDrink}`}>
        <div className="card" style={{width: '18rem'}}>
        <img src={`${strDrinkThumb}`} alt={`${strDrink}`} className="card-img-top"/>
            <div className="card-body">
                <h4 className="card-title">{strDrink}</h4>
                <p>Cateogry: {strCategory}</p>
            </div> 
        </div>
    </Link>
    );
}
export default Cocktail