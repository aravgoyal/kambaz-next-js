"use client";

import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
import { Button, FormControl } from "react-bootstrap";
import store from "../../store";

function AddReduxInner() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { sum } = useSelector((state: any) => state.addReducer);
  const dispatch = useDispatch();

  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>
      <FormControl
        type="number"
        defaultValue={a}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setA(parseInt(e.target.value || "0"))}
      />
      <FormControl
        type="number"
        defaultValue={b}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setB(parseInt(e.target.value || "0"))}
      />
      <Button
        id="wd-add-redux-click"
        onClick={() => dispatch(add({ a, b }))}
      >
        Add Redux
      </Button>
      <hr />
    </div>
  );
}

export default function AddRedux() {
  return (
    <Provider store={store}>
      <AddReduxInner />
    </Provider>
  );
}