import {useState, useEffect} from 'react';
import axios from "axios"

const useFlip = () =>{
    const [state, setState] = useState(true);
    const toggleState = () => {
        setState(state => !state)
    }
    return [state, toggleState]
}

function useAxios(localStorageKey, baseUrl) {
    const [responses, setResponses] = useLocalStorage(localStorageKey);
  
    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
      const response = await axios.get(`${baseUrl}${restOfUrl}`);
      console.log(response);
      setResponses(data => [...data, formatter(response.data)]);
    };
  
    const clearResponses = () => setResponses([]);
  
    return [responses, addResponseData, clearResponses];
}
function useLocalStorage(key, initialValue = []) {
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
}
export default useFlip; 
export {useFlip, useAxios};