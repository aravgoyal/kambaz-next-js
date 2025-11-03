"use client";
import AddRedux from "./AddRedux/page";
import CounterRedux from "./CounterRedux/page";
import HelloRedux from "./HelloRedux/page";
import TodoRedux from "./todos/TodoList";

export default function ReduxExamples() {
  return(
    <div>
      <h2>Redux Examples</h2>
        <AddRedux />
        <HelloRedux />
        <CounterRedux />
        <TodoRedux />
    </div>
  );
};
