import React, {useContext, useState, useEffect} from "react"
import UserContext from "./UserContext";
//import"./Company.css";

const Job = ({id, title,salary,equity,companyName}) =>{
    const {hasApplied, applyToJob} = useContext(UserContext)
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedStatus(){
        setApplied(hasApplied(id))
    },[id, hasApplied])

    async function handleApply(evt){
        if (hasApplied(id)) return;
        applyToJob(id)
        setApplied(true);
    }
    return (
        <div className="JobCard card">
            <p>Title: {title}</p>
            <p>Salary: {salary}</p>
            <p>Equity: {equity}</p>
            <p>Company Name: {companyName}</p>
            <button onClick={handleApply} disabled={applied}>
            {applied ? "Applied" : "Apply"}
            </button>
        </div>
    );
}

export default Job