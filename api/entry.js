import { authHeader, httpClient } from "./client";

export async function fetchEntries(token) {
  const response = await httpClient.get("/entries", authHeader(token));

  return response.data;
}

export async function storeEntry(token, entryData) {
  const response = await httpClient.post(
    "/entries",
    entryData,
    authHeader(token),
  );

  return response.data;
}

export async function updateEntry(token, id, entryData) {
  const response = await httpClient.put(
    `/entries/${id}`,
    entryData,
    authHeader(token),
  );

  return response.data;
}

export async function deleteEntry(token, id) {
  await httpClient.delete(`/entries/${id}`, authHeader(token));
}
