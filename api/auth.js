import { httpClient } from "./client";

async function authenticate(mode, email, password, name) {
  const response = await httpClient.post(`/auth/${mode}`, { email, password, name })

  return response.data;
}

export async function login(email, password) {
  return authenticate("login", email, password)
}

export async function signup(email, password, name) {
  return authenticate("signup", email, password, name)
}