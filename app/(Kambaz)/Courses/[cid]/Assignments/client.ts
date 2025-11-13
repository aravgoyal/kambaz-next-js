import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/courses`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${courseId}/assignments`);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAssignment = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${ASSIGNMENTS_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateAssignment = async (courseId: string, assignment: any) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${courseId}/assignments/${assignment._id}`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const response = await axios.delete(
    `${ASSIGNMENTS_API}/${courseId}/assignments/${assignmentId}`
  );
  return response.data;
};