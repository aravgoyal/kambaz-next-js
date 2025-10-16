"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import * as db from "../../../Database";

interface Assignment {
  _id: string;
  title: string;
  course: string;
}

interface AssignmentsProps {
  courseId: string;
}

export default function Assignments({ courseId }: AssignmentsProps) {
  const [search, setSearch] = useState("");

  const assignments: Assignment[] = db.assignments.filter(
    (a: { course: string; title: string; }) => a.course === courseId && a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="fw-bold">Assignments</h1>
        <div className="d-flex">
          <Button variant="success" className="me-2 d-flex align-items-center">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="success" className="d-flex align-items-center">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <InputGroup className="mb-4" style={{ maxWidth: "400px" }}>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search for Assignments"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <h3 id="wd-assignments-title" className="mb-3">
        ASSIGNMENTS <Button variant="success" size="sm" className="ms-2">+</Button>
      </h3>

      <ul id="wd-assignment-list" className="list-unstyled">
        {assignments.map((assignment) => (
          <li key={assignment._id} className="wd-assignment-list-item mb-3 border-start border-success ps-3">
            <Link href={`/Courses/${courseId}/Assignments/${assignment._id}`} className="fw-bold text-decoration-none">
              {assignment.title}
            </Link>
          </li>
        ))}
        {assignments.length === 0 && (
          <li className="text-muted">No assignments found for this course.</li>
        )}
      </ul>
    </div>
  );
}
