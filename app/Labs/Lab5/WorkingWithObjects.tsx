"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "CS101",
    name: "Introduction to Computer Science",
    description: "Fundamentals of programming and computer science concepts",
    course: "Computer Science"
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* Assignment Section */}
      <h4>Modifying Assignment Properties</h4>
      
      <FormControl 
        className="w-75 mb-2" 
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <a 
        id="wd-update-assignment-title"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      
      <FormControl 
        className="w-75 mb-2" 
        id="wd-assignment-score"
        type="number"
        value={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })}
      />
      <a 
        id="wd-update-assignment-score"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>

      <div className="form-check mb-2">
        <input 
          className="form-check-input" 
          type="checkbox"
          id="wd-assignment-completed"
          checked={assignment.completed}
          onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="wd-assignment-completed">
          Completed
        </label>
      </div>
      <a 
        id="wd-update-assignment-completed"
        className="btn btn-primary mb-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>

      <hr />

      <h4>Retrieving Assignment</h4>
      <a 
        id="wd-retrieve-assignments" 
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}`}>
        Get Assignment
      </a>
      <a 
        id="wd-retrieve-assignment-title" 
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}>
        Get Title
      </a>

      <hr />

      {/* Module Section */}
      <h4>Modifying Module Properties</h4>
      
      <FormControl 
        className="w-75 mb-2" 
        id="wd-module-name"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a 
        id="wd-update-module-name"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>

      <FormControl 
        className="w-75 mb-2" 
        id="wd-module-description"
        as="textarea"
        rows={3}
        value={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <a 
        id="wd-update-module-description"
        className="btn btn-primary mb-2"
        href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Module Description
      </a>

      <hr />

      <h4>Retrieving Module</h4>
      <a 
        id="wd-retrieve-module" 
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}>
        Get Module
      </a>
      <a 
        id="wd-retrieve-module-name" 
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>

      <hr />
    </div>
  );
}