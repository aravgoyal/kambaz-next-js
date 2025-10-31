"use client";
import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import store from "../../store";
import { Provider } from "react-redux";

export default function TodoList() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <Provider store={store}>
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {todos.map((todo: any) => (
          <TodoItem todo={todo} key="" />
        ))}
      </ListGroup>
      <hr/>
    </div>
    </Provider>
);}
