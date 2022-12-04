import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Food from './Foods';
import {choice, remove} from './Helpers';
import App from './App';
import * as serviceWorker from './serviceWorker';

const index = () => {
    const currFruit = choice(Food);
    console.log(`I'd like one ${currFruit}, please`);
    console.log(`Here you go ${currFruit}`);
    console.log("Delicious! May I have another?");
    const currFood = remove(currFruit);
    console.log(`I am sorry, we're all out. We have ${currFood.lenght()} left.`)
return (
    <div>
        {index}
    </div>)
}
export default index;
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
