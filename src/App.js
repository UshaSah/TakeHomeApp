import React, {useState , useRef, useEffect} from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from 'uuid';
uuidv4();

const LOCAL_STORAGE_KEY = 'todoApp.todos'
//react manages state inside ur app and when the state changes, it rerenders things
// we want to store all the todos inside a state so that everytime we need to add, delete a todo
// in order to use state in a function component, we use useState
function App() {
  // useState returns an array, first var is every single todo in the array and setTodos is the variable to update the todo
  // useRef gives us access to html element(the input)
  // useEffect saves the input everytime array of todos change
  // always make a copy to modify the state variable
  // todos is the prop we use
  const [todos, setTodos] = useState([])      //object destructing
  const todoNameRef = useRef()

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // to load our todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  function toggleTodo(id){
    const newTodos = [...todos]     //newTodos is a copy of todos
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
   function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return 
      setTodos(prevTodos => {
        return [...prevTodos, {id: uuidv4, name: name, complete: false}]
      })
    todoNameRef.current.value = null
   }

   function handleClearTodos(){
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
   }
  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>  
      <input ref = {todoNameRef} type="text"/>
      <button onClick = {handleAddTodo}>Add Todo</button>
      <div/>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
   
  );
  }

export default App;
