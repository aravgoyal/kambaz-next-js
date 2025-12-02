import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// Auth
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signin = async (credentials: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signup = async (user: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return data;
};

export const signout = async () => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return data;
};

export const profile = async () => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return data;
};

// Users
export const findAllUsers = async () => {
  const { data } = await axiosWithCredentials.get(USERS_API);
  return data;
};

export const findUserById = async (id: string) => {
  const { data } = await axios.get(`${USERS_API}/${id}`);
  return data;
};

export const findUsersByRole = async (role: string) => {
  const { data } = await axios.get(`${USERS_API}?role=${role}`);
  return data;
};

export const findUsersByPartialName = async (name: string) => {
  const { data } = await axios.get(`${USERS_API}?name=${name}`);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async (user: any) => {
  const { data } = await axios.post(USERS_API, user);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (user: any) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await axios.delete(`${USERS_API}/${userId}`);
  return data;
};