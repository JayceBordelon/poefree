import axios, { AxiosError } from "axios";
import { ServerResponse } from "../../../poefree-server/src/types/responseTypes";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

type ApiRequest = <T>(
  request: Promise<{ data: T }>,
) => Promise<T | ServerResponse>;

export const gracefulApiRequest: ApiRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      return error.response.data as ServerResponse;
    }
    throw error;
  }
};

export default apiClient;
