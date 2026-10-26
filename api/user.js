import { authHeader, deleteHeader, httpClient } from "./client";

export async function fetchMe(token) {
  const response = await httpClient.get("/users/me", authHeader(token));

  return response.data;
}

export async function withdraw(token, password) {
  const response = await httpClient.delete("/users/me", {
    ...authHeader(token),
    ...deleteHeader(password),
  });

  return response.data;
}
