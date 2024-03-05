import { useState } from 'react'
import {
  AppBar,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, toggleComplete, setFilter, selectFilteredTodos, selectFilter } from './store/todo'

function App () {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const count = useSelector(state => state.todo.num)
  const todos = useSelector(selectFilteredTodos);
  const currentFilter = useSelector(selectFilter);

  const handleAddTodo = (text) => {
    if (text.length >= 5) {
      dispatch(addTodo(text));
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleChangeFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  const numTodos = todos.length
  const numCompletedTodos = todos.filter((todo) => todo.completed).length
  const numIncompleteTodos = numTodos - numCompletedTodos


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
              event.preventDefault()
              handleAddTodo(text)
            }}
          >
            <TextField
              type="text"
              label={!todos.length > 0 ? `Add some todo` : `Title for another todo`}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <Button type="submit" variant="contained" color="secondary">
              Add
            </Button>
          </form>
          <div className="App__Add_Form">
            <Button variant="outlined" disabled={currentFilter === 'all'} onClick={() => handleChangeFilter('all')}>All</Button>
            <Button variant="outlined" disabled={currentFilter === 'current'} onClick={() => handleChangeFilter('current')}>Current</Button>
            <Button variant="outlined" disabled={currentFilter === 'completed'} onClick={() => handleChangeFilter('completed')}>Completed</Button>
          </div>
          <List className="App__TodoList">
            {todos.length > 0 && todos.map((todo) => (
              <ListItem
                key={todo.id}
                disablePadding={true}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      checked={todo.completed}
                      onChange={(event) =>
                        handleToggleComplete(todo.id, event.target.checked)
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div
                        className={
                          todo.completed ? 'App__TodoItemText--Completed' : ''
                        }
                      >
                        {(todo.completed ? 'DONE: ' : 'TODO: ') + todo.title}
                      </div>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Typography className="App__Statistics">
            {numTodos} todos ({numIncompleteTodos} incomplete,{' '}
            {numCompletedTodos} completed)
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default App
