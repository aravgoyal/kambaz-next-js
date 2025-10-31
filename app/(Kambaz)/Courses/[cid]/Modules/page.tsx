"use client";
import { Key, useState } from "react";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { v4 as uuidv4 } from "uuid";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");
  const dispatch = useDispatch();


  return (
    <div>
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => { dispatch(addModule({ name: moduleName, course: cid })); setModuleName(""); }} /><br /><br /><br /><br />
  <ListGroup className="rounded-0" id="wd-modules">
    {modules.map((module: { _id: Key | null | undefined; editing: any; name: string | number | readonly string[] | undefined; }) => (
      <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />{" "}
          {!module.editing ? (
            module.name || "Unnamed Module"
          ) : (
            <FormControl
              className="w-50 d-inline-block"
              onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
              onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
              defaultValue={module.name}
            />
          )}
          <ModuleControlButtons moduleId={String(module._id ?? "")}
                  deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))} />
        </div>
        <ListGroup className="wd-lessons rounded-0">
          <ListGroupItem className="wd-lesson p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
          </ListGroupItem>
          <ListGroupItem className="wd-lesson p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
          </ListGroupItem>
          <ListGroupItem className="wd-lesson p-3 ps-1">
            Learn what is Web Development </ListGroupItem>
        </ListGroup>
      </ListGroupItem>
    ))}
    <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 </div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          LESSON 1 </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          LESSON 2 </ListGroupItem>
      </ListGroup>
    </ListGroupItem>
  </ListGroup>

    </div>
);}
