import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
export default store;
