import React from "react"
import"./Company.css";

const Company = ({handle,name,description,logoUrl}) =>{
    return (
        <div className="CompanyCard card">
            <p>{handle}</p>
            <p>{name}</p>
            <p>{description}</p>
        </div>
    );
}

export default Company