import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    num: 0,
    todos: [],
    filterBy: 'all',
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      state.count += 1;
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (state, action) => {
      state.filterBy = action.payload;
    }
  },
});
export const { addTodo, toggleComplete, setFilter } = todoSlice.actions;
export const selectTodos = (state) => state.todo.todos;
export const selectFilter = (state) => state.todo.filterBy;
export const selectFilteredTodos = (state) => {
  const { todos, filterBy } = state.todo;
  switch (filterBy) {
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'current':
      return todos.filter((todo) => !todo.completed);
    default:
      return todos;
  }
};
export default todoSlice;