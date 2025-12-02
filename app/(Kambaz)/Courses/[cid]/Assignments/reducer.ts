import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newAssignment: any = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableDate: assignment.availableDate,
        availableUntil: assignment.availableUntil,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;