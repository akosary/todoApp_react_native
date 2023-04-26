import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleDone,
  toggleDetails,
  closeDetails,
  setFilter,
} from "./slice";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";

const Home = () => {
  const dispatch = useDispatch();

  // Select the relevant parts of the state from the Redux store
  const { todos, filter, showDetails, selectedTodo } = useSelector(
    (state) => state.todos
  );

  // Define local state for the new todo input field
  const [newTodoText, setNewTodoText] = useState("");

  // Define event handlers for adding and deleting todos
  const handleAddTodo = () => {
    dispatch(addTodo({ text: newTodoText }));
    setNewTodoText("");
  };

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo({ index }));
  };

  // Define event handlers for toggling the done status and details view of todos
  const handleToggleDone = (index) => {
    dispatch(toggleDone({ index }));
  };

  const handleToggleDetails = (todo) => {
    dispatch(toggleDetails({ todo }));
  };

  const handleCloseDetails = () => {
    dispatch(closeDetails());
  };

  // Define event handler for filtering todos
  const handleSetFilter = (filter) => {
    dispatch(setFilter({ filter }));
  };

  // Define a function for rendering the todo list
  const renderTodos = () => {
    const filteredTodos =
      filter === "ALL"
        ? todos
        : filter === "DONE"
        ? todos.filter((todo) => todo.done)
        : todos.filter((todo) => !todo.done);
    return (
      <FlatList
        data={filteredTodos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoContainer}>
            <Text
              style={item.done ? styles.todoDone : styles.todo}
              onPress={() => handleToggleDone(index)}
            >
              {item.text}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => handleToggleDetails(item)}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTodo(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );
  };

  // Define a function for rendering the details view of a todo
  const renderDetails = () => {
    if (!selectedTodo) {
      return null;
    }
    return (
      <Modal visible={showDetails} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTodo.text}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleCloseDetails}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodoText}
          onChangeText={(text) => setNewTodoText(text)}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleAddTodo()}
        >
          <Text style={styles.filterButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={
            filter === "ALL" ? styles.filterButtonActive : styles.filterButton
          }
          onPress={() => handleSetFilter("ALL")}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            filter === "DONE" ? styles.filterButtonActive : styles.filterButton
          }
          onPress={() => handleSetFilter("DONE")}
        >
          <Text style={styles.filterButtonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            filter === "UNDONE"
              ? styles.filterButtonActive
              : styles.filterButton
          }
          onPress={() => handleSetFilter("UNDONE")}
        >
          <Text style={styles.filterButtonText}>Undone</Text>
        </TouchableOpacity>
      </View>
      {renderTodos()}
      {renderDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
  filterButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginVertical: 5,
    width: "90%",
  },
  todo: {
    fontSize: 18,
  },
  todoDone: {
    fontSize: 18,
    textDecorationLine: "line-through",
    color: "#ccc",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  detailsButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#f00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "#f00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 20,
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Home;
