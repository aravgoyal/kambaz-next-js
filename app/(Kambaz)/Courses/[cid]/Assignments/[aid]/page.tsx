"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const params = useParams();
  const { courseId, assignmentId } = params;

  const [assignment, setAssignment] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  useEffect(() => {
    const a = db.assignments.find(
      (item) => item._id === assignmentId && item.course === courseId
    );

  }, [assignmentId, courseId]);

  if (!assignment) {
    return <p className="p-3">Assignment not found.</p>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <h2>Edit Assignment</h2>

      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="wd-points">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="wd-group">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="wd-display-grade-as">
              <Form.Label>Display Grade as</Form.Label>
              <Form.Select defaultValue="Percentage">
                <option>Percentage</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="wd-submission-type">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select defaultValue="Online">
            <option>Online</option>
          </Form.Select>
          <Form.Text className="text-muted d-block mb-2">
            Online Entry Options
          </Form.Text>
          <Form.Check type="checkbox" label="Text Entry" />
          <Form.Check type="checkbox" label="Website URL" />
          <Form.Check type="checkbox" label="Media Recordings" />
          <Form.Check type="checkbox" label="Student Annotation" />
          <Form.Check type="checkbox" label="File Uploads" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-assign-to">
          <Form.Label>Assign To</Form.Label>
          <Form.Control as="textarea" defaultValue="Everyone" />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="wd-due-date">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="wd-available-from">
              <Form.Label>Available From</Form.Label>
              <Form.Control
                type="datetime-local"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="datetime-local"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Link href={`/Courses/${courseId}/Assignments`} className="btn btn-secondary">
            Cancel
          </Link>
          <Link href={`/Courses/${courseId}/Assignments`} className="btn btn-primary">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
