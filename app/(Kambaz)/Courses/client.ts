import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.NEXT_PUBLIC_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// Courses
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

// Modules
export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createModuleForCourse = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return data;
};

// Assignments
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const { data } = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

// Enrollments
export const findAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/user/${userId}`);
  return data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(ENROLLMENTS_API, { userId, courseId });
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return data;
};