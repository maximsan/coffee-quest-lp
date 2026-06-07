import { loadLocalEnv } from "./loadLocalEnv.mjs";

export function loadMaintenanceEnv() {
  loadLocalEnv();
}

export function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}
