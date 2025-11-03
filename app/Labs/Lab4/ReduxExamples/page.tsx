"use client";
import { Provider } from "react-redux";
import store from "../store";
import AddRedux from "./AddRedux/page";
import CounterRedux from "./CounterRedux/page";
import HelloRedux from "./HelloRedux/page";
import TodoRedux from "./todos/TodoList";

export default function ReduxExamples() {
  return(
    <Provider store={store}>
    <div>
      <h2>Redux Examples</h2>
        <AddRedux />
        <HelloRedux />
        <CounterRedux />
        <TodoRedux />
    </div>
    </Provider>
  );
};
