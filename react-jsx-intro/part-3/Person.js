const Person = ({name, age, hobbies}) =>{
    if (name.length > 8){
        name = name.slice(0,6);
    }
    let voteStatus = false;
    if (age>=18){
        voteStatus = true;
    }
    return (
        <div>
            <p>Learn some informaiton about this person</p>
            <h1>Name: {name} </h1>
            <h2>Age: {age} </h2>
            <h3>Vote Status {voteStatus ? "please go vote!" : "you must be 18"}</h3>
            <h4>Hobbies</h4>
            <ul>{hobbies.map(h => (<li>{h}</li>))}</ul>
        </div>
    )
}