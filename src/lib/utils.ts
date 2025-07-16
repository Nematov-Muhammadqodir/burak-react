import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3003",
  withCredentials: true,
});
export function formatMessageTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
