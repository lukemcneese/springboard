import React from "react"
//import"./Company.css";

const Job = ({title,salary,equity,companyName}) =>{
    return (
        <div className="JobCard card">
            <p>Title: {title}</p>
            <p>Salary: {salary}</p>
            <p>Equity: {equity}</p>
            <p>Company Name: {companyName}</p>
        </div>
    );
}

export default Job