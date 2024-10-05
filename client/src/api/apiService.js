import axiosInstance from "./axiosInstance";

const apiService = {
  login: async (credentials) => {
    return await axiosInstance.post("/auth/login", credentials);
  },

  register: async (userData) => {
    return await axiosInstance.post("/auth/register", userData);
  },
};

export default apiService;
