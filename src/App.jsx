import { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import "./App.css";

function App() {
  const [todos, setTodos] = useState(( () => {
    const savedItem = localStorage.getItem("todos");
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || [];
  }));


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    console.log(storedTodos);
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);



  function addTodo(title) {
    let maxId = 0;
    for (let todo of todos) {
      maxId = Math.max(maxId, todo.id);
    }
    setTodos([...todos, { id: maxId + 1, title, completed: false }]);
  }

  function setTodoCompleted(id, completed) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function deleteCompletedTodos() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  const numTodos = todos.length;
  const numCompletedTodos = todos.filter((todo) => todo.completed).length;
  const numIncompleteTodos = numTodos - numCompletedTodos;

  const [newTitle, setNewTitle] = useState("");

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar className="App__Toolbar">
          <Typography variant="h5">Todo</Typography>
        </Toolbar>
      </AppBar>
      <div className="App__Container">
        <div className="App__Main">
          <form
            className="App__Add_Form"
            onSubmit={(event) => {
              event.preventDefault();
              addTodo(newTitle);
              setNewTitle("");
            }}
          >
            <TextField
              type="text"
              label="title of new todo"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
            <Button type="submit" variant="contained" color="secondary">
              Add
            </Button>
          </form>
          <List className="App__TodoList">
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding={true}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      checked={todo.completed}
                      onChange={(event) =>
                        setTodoCompleted(todo.id, event.target.checked)
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div
                        className={
                          todo.completed ? "App__TodoItemText--Completed" : ""
                        }
                      >
                        {(todo.completed ? "DONE: " : "TODO: ") + todo.title}
                      </div>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Typography className="App__Statistics">
            {numTodos} todos ({numIncompleteTodos} incomplete,{" "}
            {numCompletedTodos} completed)
          </Typography>
          <Button onClick={deleteCompletedTodos}>
            delete all completed todos
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
