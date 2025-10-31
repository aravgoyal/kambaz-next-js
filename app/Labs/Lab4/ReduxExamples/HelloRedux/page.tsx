"use client";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store";
import { Provider } from "react-redux";

export default function HelloRedux() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { message } = useSelector((state: any) => state.helloReducer);
  return (
    <Provider store={store}>
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
    </div>
    </Provider>
  );
}
