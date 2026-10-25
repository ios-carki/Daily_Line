import axios from "axios";

import { env } from "../constants/env";

export const httpClient = axios.create({
  baseURL: env.API_URL,
  timeout: env.REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

export const authHeader = (token) => ({
  headers: { Authorization: "Bearer " + token },
});
