import { authHeader, httpClient } from "./client";

export async function fetchEntries(token) {
  const response = await httpClient.get('/entries', authHeader(token))
  
  return response.data
}