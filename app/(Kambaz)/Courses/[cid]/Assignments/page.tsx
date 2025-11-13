"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import * as client from "./client";

export default function Assignments() {
  const params = useParams();
  const courseId = params.cid as string;
  const dispatch = useDispatch();
  
  const [search, setSearch] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const assignments = useSelector((state: any) => state?.assignmentsReducer?.assignments ?? []);

  const fetchAssignments = async () => {
    try {
      const assignments = await client.findAssignmentsForCourse(courseId);
      dispatch(setAssignments(assignments));
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [courseId]);

  const courseAssignments = assignments.filter(
    (a: any) => 
      a.course === courseId && 
      a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (assignmentToDelete) {
      try {
        await client.deleteAssignment(courseId, assignmentToDelete);
        dispatch(deleteAssignment(assignmentToDelete));
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="fw-bold">Assignments</h1>
        <div className="d-flex">
          <Button variant="success" className="me-2 d-flex align-items-center">
            <FaPlus className="me-1" /> Group
          </Button>
          <Link href={`/Courses/${courseId}/Assignments/new`}>
            <Button variant="success" className="d-flex align-items-center">
              <FaPlus className="me-1" /> Assignment
            </Button>
          </Link>
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
        ASSIGNMENTS 
        <Link href={`/Courses/${courseId}/Assignments/new`}>
          <Button variant="success" size="sm" className="ms-2">+</Button>
        </Link>
      </h3>

      <ul id="wd-assignment-list" className="list-unstyled">
        {courseAssignments.map((assignment: any) => (
          <li 
            key={assignment._id} 
            className="wd-assignment-list-item mb-3 border-start border-success ps-3 d-flex justify-content-between align-items-start"
          >
            <div className="flex-grow-1">
              <Link 
                href={`/Courses/${courseId}/Assignments/${assignment._id}`} 
                className="fw-bold text-decoration-none"
              >
                {assignment.title}
              </Link>
              <div className="text-muted small">
                <span>Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}</span>
                {assignment.points && <span className="ms-3">Points: {assignment.points}</span>}
              </div>
            </div>
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => handleDeleteClick(assignment._id)}
              className="ms-2"
            >
              <FaTrash />
            </Button>
          </li>
        ))}
        {courseAssignments.length === 0 && (
          <li className="text-muted">No assignments found for this course.</li>
        )}
      </ul>

      <Modal show={showDeleteDialog} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}