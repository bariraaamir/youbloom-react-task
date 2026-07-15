import axios from "axios";

const API_BASE = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE}/users`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_BASE}/users/${id}`);
  return response.data;
};