"use client";

import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const isFaculty = currentUser?.role === "FACULTY";
  const isEnrolled = enrollments.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (enrollment: any) =>
      enrollment.user === currentUser?._id && enrollment.course === courseId
  );

  useEffect(() => {
    if (!isFaculty && !isEnrolled) {
      router.push("/Dashboard");
    }
  }, [isFaculty, isEnrolled, router]);

  if (!isFaculty && !isEnrolled) {
    return null;
  }

  return <>{children}</>;
}