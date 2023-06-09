import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filter: "ALL",
  showDetails: false,
  selectedTodo: null,
};

// Create a todos slice using createSlice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ text: action.payload.text, done: false });
    },
    deleteTodo: (state, action) => {
      state.todos.splice(action.payload.index, 1);
    },
    toggleDone: (state, action) => {
      state.todos[action.payload.index].done =
        !state.todos[action.payload.index].done;
    },
    toggleDetails: (state, action) => {
      state.showDetails = true;
      state.selectedTodo = action.payload.todo;
    },
    closeDetails: (state) => {
      state.showDetails = false;
      state.selectedTodo = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload.filter;
    },
  },
});

// Create the Redux store with the todos slice as a reducer
const store = configureStore({
  reducer: todosSlice.reducer,
});

// Export the actions generated by the todos slice
export const {
  addTodo,
  deleteTodo,
  toggleDone,
  toggleDetails,
  closeDetails,
  setFilter,
} = todosSlice.actions;

export default todosSlice.reducer;
