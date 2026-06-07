import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { parse as parseEnvFile } from "dotenv";

export const LOCAL_ENV_FILES = [".env", ".env.local", ".env.private.local"];

export function loadLocalEnv({
  cwd = process.cwd(),
  files = LOCAL_ENV_FILES,
} = {}) {
  const shellEnvNames = new Set(Object.keys(process.env));

  for (const file of files) {
    const filePath = resolve(cwd, file);

    if (!existsSync(filePath)) {
      continue;
    }

    const parsed = parseEnvFile(readFileSync(filePath));

    for (const [name, value] of Object.entries(parsed)) {
      if (!shellEnvNames.has(name)) {
        process.env[name] = value;
      }
    }
  }
}
