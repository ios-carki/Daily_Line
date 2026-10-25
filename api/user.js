import { authHeader, httpClient } from "./client";

export async function fetchMe(token) {
  const response = await httpClient.get('/users/me', authHeader(token))

  return response.data
}