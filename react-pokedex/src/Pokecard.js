import React from 'react';
import './Pokecard.css';
//const pokemonImgURL = `

const Pokecard = ({id,name,type,base_experience}) => (
    <div className = "pokecard">
        <h3 className='pokecard-name'>{name}</h3>
        <img className='pokecard-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name}/>
        <p>Type:{type}</p>
        <p>EXP:{base_experience}</p>
    </div>
)

export default Pokecard;
