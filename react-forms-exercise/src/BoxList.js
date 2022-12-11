import React,{useState} from "react";
import Box from "./Box"
import NewBoxForm from "./NewBoxForm";
import {v4 as uuid} from "uuid";

const BoxList = () =>{
    const INTIAL_LIST = [
        //{id: uuid(), color: "blue", height : 150, width : 150},
        //{id: uuid(), color: "green", height : 150, width: 150}
    ]
    const [boxes, setBoxes] = useState(INTIAL_LIST)

    const addBox = box =>{
        let newBox = {...box, id :uuid()};
        setBoxes(boxes => [...boxes, newBox])
    }
    const removeBox = id =>{
        setBoxes(boxes => boxes.filter(box => box.id !== id));
    }
    return (
        <div>
            <h3>Box</h3>
            <NewBoxForm addBox={addBox}/>
            <div  style={{display : "flex", justifyContent: "space-evenly", flexWrap : "wrap", width : "1000px"}} >
                {boxes.map(({id, color, height, width}) => 
                <Box 
                    id= {id} 
                    key={id} 
                    color={color} 
                    height={height} 
                    width = {width} 
                    removeBox= {removeBox} />)}
            </div>
        </div>
    )
    }
    export default BoxList;