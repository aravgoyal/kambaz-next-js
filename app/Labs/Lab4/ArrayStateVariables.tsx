"use client";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { useSelector } from "react-redux";
export default function ArrayStateVariable() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const todos = useSelector((state: any) => state?.todosReducer?.todos ?? []);
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => i !== index));
 };
 return (
  <div id="wd-array-state-variables">
   <h2>Array State Variable</h2>
   <button onClick={addElement}>Add Element</button>
   <ul>
    <ListGroup>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
   </ul><hr/></div>);}