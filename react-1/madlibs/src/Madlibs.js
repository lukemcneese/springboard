import React, {useState} from 'react';
import FormMadlibs from './FormMadlibs';
import Madlib from './Madlib'
import {v4 as uuid} from "uuid";

const Madlibs = () =>{
    const [madlibs, setMadlibs] = useState([]);
    const [formVisible, setFormVisible] = useState(true)
    const addMadLib = lib =>{
        let newLib = {...lib, id: uuid()}
        setMadlibs(madlibs => [...madlibs, newLib])
    }
    const toggleFormVisible = ()=>{
        setFormVisible(false);
    }
    return (
        <>
            <h1>Madlibs!</h1>
            
            {formVisible ? <FormMadlibs addMadLib={addMadLib} toggleFormVisible={toggleFormVisible}/> :
            <div>
                {madlibs.map(({id, noun, noun2, adjective, color}) =>
                <Madlib id = {id} key = {id} noun = {noun} noun2 = {noun2} adjective = {adjective} color = {color}/> )}
            </div>}
        </>
    )
}
export default Madlibs;