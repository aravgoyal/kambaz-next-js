"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { setCourses } from "../Courses/reducer";
import { enrollInCourse, unenrollFromCourse, toggleShowAllCourses, setEnrollments } from "../Enrollment/reducer";
import * as client from "../Courses/client";

export default function Dashboard() {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { courses } = useSelector((state: any) => state.coursesReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { enrollments, showAllCourses } = useSelector((state: any) => state.enrollmentsReducer);

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

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "TA";
  const isStudent = currentUser?.role === "STUDENT";

  const isEnrolled = (courseId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return enrollments.some((e: any) => e.user === currentUser?._id && e.course === courseId);
  };

  const getDisplayedCourses = () => {
    if (isFaculty) return courses;
    if (isStudent && !showAllCourses) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return courses.filter((c: any) => isEnrolled(c._id));
    }
    return courses;
  };

  const fetchCourses = async () => {
    try {
      const data = await client.fetchAllCourses();
      dispatch(setCourses(data));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchEnrollments = async () => {
    if (!currentUser) return;
    try {
      const data = await client.findEnrollmentsForUser(currentUser._id);
      dispatch(setEnrollments(Array.isArray(data) ? data : []));
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      dispatch(setEnrollments([]));
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.enrollIntoCourse(currentUser._id, courseId);
      dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.unenrollFromCourse(currentUser._id, courseId);
      dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  const handleAddCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const handleUpdateCourse = async () => {
    await client.updateCourse(course);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(setCourses(courses.map((c: any) => (c._id === course._id ? course : c))));
  };

  const handleDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser]);

  const displayedCourses = getDisplayedCourses();

  const getHeadingText = () => {
    if (isStudent && !showAllCourses) return `Enrolled Courses (${displayedCourses.length})`;
    if (isFaculty) return `Published Courses (${displayedCourses.length})`;
    return `All Courses (${displayedCourses.length})`;
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button onClick={handleAddCourse} className="btn btn-primary float-end" id="wd-add-new-course-click">
              Add
            </button>
            <button onClick={handleUpdateCourse} className="btn btn-secondary float-end me-2" id="wd-update-course-click">
              Update
            </button>
          </h5>
          <br />
          <FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      {isStudent && (
        <div className="mb-3">
          <Button variant={showAllCourses ? "secondary" : "primary"} onClick={() => dispatch(toggleShowAllCourses())} className="mb-3">
            {showAllCourses ? "My Courses" : "Show All Courses"}
          </Button>
        </div>
      )}

      <h2 id="wd-dashboard-published">{getHeadingText()}</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {displayedCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${c._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                  <CardImg src="/images/Green.jpg" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{c.name}</CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {c.description}
                    </CardText>

                    {(isFaculty || isEnrolled(c._id)) && (
                      <Button variant="primary" className="me-2">Go</Button>
                    )}

                    {isStudent && (
                      isEnrolled(c._id) ? (
                        <Button variant="danger" onClick={(e) => { e.preventDefault(); handleUnenroll(c._id); }}>
                          Unenroll
                        </Button>
                      ) : (
                        <Button variant="success" onClick={(e) => { e.preventDefault(); handleEnroll(c._id); }}>
                          Enroll
                        </Button>
                      )
                    )}

                    {isFaculty && (
                      <>
                        <button className="btn btn-danger ms-2" onClick={(e) => { e.preventDefault(); handleDeleteCourse(c._id); }}>
                          Delete
                        </button>
                        <button id="wd-edit-course-click" className="btn btn-warning float-end" onClick={(e) => { e.preventDefault(); setCourse(c); }}>
                          Edit
                        </button>
                      </>
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