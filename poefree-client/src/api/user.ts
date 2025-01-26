import { CreateUserPayload } from "@backend/payloads/userPayloads";
import { ServerResponse } from "@backend/responseTypes";
import apiClient, { gracefulApiRequest } from "./apiClient";

export const registerNewUser = async (
  createUserPayload: CreateUserPayload,
): Promise<ServerResponse> => {
  return gracefulApiRequest(
    apiClient.post<ServerResponse>("/users", createUserPayload),
  );
};

export const getAllUsers = async (): Promise<ServerResponse> => {
  return gracefulApiRequest(apiClient.get<ServerResponse>("/users"));
};
