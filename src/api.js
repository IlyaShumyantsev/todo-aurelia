import { mockFetch } from "./mock-fetch";

export function getUsers() {
  return mockFetch("/users");
}
