"use client";

import Link from "next/link";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function Assignments() {
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
        <Form.Control placeholder="Search for Assignments" />
      </InputGroup>

      <h3 id="wd-assignments-title" className="mb-3">
        ASSIGNMENTS 40% of Total <Button variant="success" size="sm" className="ms-2">+</Button>
      </h3>

      <ul id="wd-assignment-list" className="list-unstyled">
        <li className="wd-assignment-list-item mb-3 border-start border-success ps-3">
          <Link href="/Courses/1234/Assignments/123" className="fw-bold text-decoration-none">
            A1 - ENV + HTML
          </Link>
          <div className="text-muted small">
            Multiple Modules | Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item mb-3 border-start border-success ps-3">
          <Link href="/Courses/1234/Assignments/124" className="fw-bold text-decoration-none">
            A2 - CSS + BOOTSTRAP
          </Link>
          <div className="text-muted small">
            Multiple Modules | Not available until May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item mb-3 border-start border-success ps-3">
          <Link href="/Courses/1234/Assignments/125" className="fw-bold text-decoration-none">
            A3 - JAVASCRIPT + REACT
          </Link>
          <div className="text-muted small">
            Multiple Modules | Not available until May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}
