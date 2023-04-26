import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Todo from "./todo";

export default function todos({ todosList, setTodos }) {
  // const [mytodosList, setTodosList] = useState([]);

  useEffect(() => {
    setTodos(todosList);
  }, []);
  return (
    <View>
      {todosList.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </View>
  );
}
