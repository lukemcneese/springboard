const App = () =>(
    <div>
        <Person name="lukemcneese" age="34" hobbies={['cycling', 'board games']}/>
        <Person name="shelbyj" age="36" hobbies={['puzzles','wordle', 'board games']}/>
        <Person name="micah" age="5" hobbies={['legos', 'hot wheels']}/>
    </div>
)

ReactDOM.render(<App/>, document.getElementById("root"))