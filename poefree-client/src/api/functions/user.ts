import {
  CreateUserPayload,
  LoginUserPayload,
} from "../../../../poefree-server/src/types/payloads/authPaylods";
import { ServerResponse } from "../../../../poefree-server/src/types/responseTypes";
import apiClient, { gracefulApiRequest } from "../apiClient";
import { ENDPOINTS } from "../endpoints";

export const registerNewUser = async (
  createUserPayload: CreateUserPayload,
): Promise<ServerResponse> => {
  return gracefulApiRequest(
    apiClient.post<ServerResponse>(ENDPOINTS.REGISTER, createUserPayload),
  );
};

export const loginUser = async (
  loginUserPayload: LoginUserPayload,
): Promise<ServerResponse> => {
  return gracefulApiRequest(
    apiClient.post<ServerResponse>(ENDPOINTS.REGISTER, loginUserPayload),
  );
};
