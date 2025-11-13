import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
    enrollInCourse: (state, { payload: { userId, courseId } }) => {
      const newEnrollment = {
        _id: Date.now().toString(),
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    unenrollFromCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (enrollment: any) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { setEnrollments, enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;