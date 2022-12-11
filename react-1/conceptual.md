### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it? is front end framework used to create interactive applications, you use when you need to add logic to your application

- What is Babel? is an interpreter that changes the jsx to html

- What is JSX? is is react code essentially that we write inside a return that is similar to html

- How is a Component created in React? calling a function/variable using <ComponenentName/>

- What are some difference between state and props? props are variable passed to a component and maybe passed back up, that do not live on passed that particiular rendering, state allows data to persist after a render

- What does "downward data flow" refer to in React? it is state or props that are passed down to components to be formated for the render and then the jsx is returned

- What is a controlled component? react state that is tied to indivudal pieces of the form 

- What is an uncontrolled component? react does not know about the state of the form until the button is clicked or another action is fired

- What is the purpose of the `key` prop when rendering a list of components? it is used in comarisons of the state that may generate a re-render it allows react to know the items it needs to render out of that list

- Why is using an array index a poor choice for a `key` prop when rendering a list of components? indexes may get reassigned with a shift, push, pop etc then they are no longer UIDs

- Describe useEffect.  What use cases is it used for in React components? it allows you to do something after a render, or do something that takes time you can use it in conjuction with async await axios for a api call

- What does useRef do?  Does a change to a ref value cause a rerender of a component? allows you to access a particulat part of the dom or data that does not have a react function.

- When would you use a ref? When wouldn't you use one? Interval IDs from a setTimeout and clearing an intervals. when their is a react function that allows you to acces that piece of the dom

- What is a custom hook in React? When would you want to write one?
allows you to perform essentially function that still has access the variables inside a component. this can also be used to reduce duplicate code
