"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import * as client from "../client";

export default function AssignmentEditor() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid: courseId, assignmentId } = params;

  const assignments = useSelector((state: any) => state?.assignmentsReducer?.assignments ?? []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  const isNewAssignment = assignmentId === "new";

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (!isNewAssignment) {
      const assignment = assignments.find(
        (a: any) => a._id === assignmentId && a.course === courseId
      );

      if (assignment) {
        setTitle(assignment.title || "");
        setDescription(assignment.description || "");
        setPoints(assignment.points || 100);
        setDueDate(formatDateForInput(assignment.dueDate) || "");
        setAvailableFrom(formatDateForInput(assignment.availableFromDate) || "");
        setAvailableUntil(formatDateForInput(assignment.availableUntilDate) || "");
      }
    } else {
      setTitle("");
      setDescription("");
      setPoints(100);
      setDueDate("");
      setAvailableFrom("");
      setAvailableUntil("");
    }
  }, [assignmentId, courseId, assignments, isNewAssignment]);

  const handleSave = async () => {
    const assignmentData = {
      title,
      description,
      points,
      dueDate,
      availableFromDate: availableFrom,
      availableUntilDate: availableUntil,
      course: courseId,
    };

    try {
      if (isNewAssignment) {
        const newAssignment = await client.createAssignment(courseId as string, assignmentData);
        dispatch(addAssignment(newAssignment));
      } else {
        await client.updateAssignment(courseId as string, {
          _id: assignmentId,
          ...assignmentData,
        });
        dispatch(updateAssignment({
          _id: assignmentId,
          ...assignmentData,
        }));
      }
      router.push(`/Courses/${courseId}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <h2>{isNewAssignment ? "Create New Assignment" : "Edit Assignment"}</h2>

      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter assignment name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter assignment description"
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
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}