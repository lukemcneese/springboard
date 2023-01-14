import React,{useContext} from "react";
import {Navigate} from "react-router-dom";
import UserContext from "./UserContext";

function ProtectedRoute({children}){
    const {currUser} = useContext(UserContext);
    console.log(currUser)
    if (!currUser){
        return <Navigate to="/"/>
    }
    return children;
}
export default ProtectedRoute;