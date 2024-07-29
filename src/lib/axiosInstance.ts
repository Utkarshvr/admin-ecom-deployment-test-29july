import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URI;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,

  // headers: {
  //   Authorization:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMDUxNTg3NCwiZXhwIjoxNzIwNjAyMjc0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.8WZtDwkK3NXwdQCbpAmu-U5JudSSA3UiUjqu2_tdHdQ",
  // },

  withCredentials: true,
});
export default axiosInstance;
