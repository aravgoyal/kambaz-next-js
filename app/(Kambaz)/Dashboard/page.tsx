"use client";
import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "./Enrollments/client";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { setEnrollments, enrollInCourse, unenrollFromCourse } from "./Enrollments/reducer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { courses } = useSelector((state: any) => state.coursesReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: { _id: string; }) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await coursesClient.updateCourse(course);
    dispatch(setCourses(courses.map((c: { _id: any; }) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));
  };

  const onAddNewCourse = async () => {
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const courses = await coursesClient.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      if (currentUser?._id) {
        const enrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
        dispatch(setEnrollments(enrollments));
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);

  const [showAllCourses, setShowAllCourses] = useState(false);

  const isFaculty = currentUser?.role === "FACULTY";

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  // Handle enrollment
  const handleEnroll = async (courseId: string) => {
    try {
      await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
      dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  // Handle unenrollment
  const handleUnenroll = async (courseId: string) => {
    try {
      await enrollmentsClient.unenrollUserFromCourse(currentUser._id, courseId);
      dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  // Filter courses based on showAllCourses toggle
  const displayedCourses = showAllCourses
    ? courses
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : courses.filter((course: any) => isEnrolled(course._id));

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Courses" : "All Courses"}
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course</h5>
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={onAddNewCourse}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={onUpdateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {displayedCourses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => {
                    if (!isEnrolled(course._id) && !isFaculty) {
                      e.preventDefault();
                      alert("You must be enrolled in this course to access it.");
                    }
                  }}
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>

                    {isFaculty && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          onDeleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                    )}

                    {!isFaculty && isEnrolled(course._id) && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleUnenroll(course._id);
                        }}
                        className="btn btn-danger float-end"
                      >
                        Unenroll
                      </button>
                    )}

                    {!isFaculty && !isEnrolled(course._id) && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleEnroll(course._id);
                        }}
                        className="btn btn-success float-end"
                      >
                        Enroll
                      </button>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}