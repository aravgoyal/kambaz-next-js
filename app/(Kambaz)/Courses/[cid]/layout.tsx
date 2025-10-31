"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";
import ProtectedRoute from "./ProtectedRoute";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { courses } = useSelector((state: any) => state.coursesReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = courses.find((course: any) => course._id === cid);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <ProtectedRoute>
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify
            className="me-4 fs-4 mb-1"
            style={{ cursor: "pointer" }}
            onClick={toggleSidebar}
          />
          {course?.name}
        </h2>
        <hr />
        <div className="d-flex">
          {isSidebarVisible && (
            <div className="d-none d-md-block">
              <CourseNavigation />
            </div>
          )}
          <div className="flex-fill">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}