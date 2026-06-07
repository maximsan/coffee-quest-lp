import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  LOCAL_ENV_FILES,
  loadLocalEnv,
} from "./lib/loadLocalEnv.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const requiredEnvByScope = {
  waitlist: ["SUPABASE_URL", "SUPABASE_SECRET_KEY"],
  count: ["COUNT_API_TOKEN", "SUPABASE_URL", "SUPABASE_SECRET_KEY"],
  app: ["SUPABASE_URL", "SUPABASE_SECRET_KEY", "COUNT_API_TOKEN"],
  maintenance: [
    "SUPABASE_URL",
    "SUPABASE_SECRET_KEY",
    "BLOB_READ_WRITE_TOKEN",
  ],
  email: ["RESEND_API_KEY", "WAITLIST_FROM_EMAIL", "PUBLIC_SITE_URL"],
};

requiredEnvByScope.all = [
  ...new Set([
    ...requiredEnvByScope.app,
    ...requiredEnvByScope.maintenance,
    ...requiredEnvByScope.email,
  ]),
];

const args = parseArgs(process.argv.slice(2));
const scope = args.scope ?? "app";

if (!requiredEnvByScope[scope]) {
  console.error(
    `Unknown env scope "${scope}". Valid scopes: ${Object.keys(requiredEnvByScope).join(", ")}`,
  );
  process.exit(1);
}

if (!args.noDotenv) {
  loadLocalEnv(getEnvFiles(args.envFile));
}

const requiredNames = requiredEnvByScope[scope];
const missingNames = requiredNames.filter((name) => !process.env[name]?.trim());

if (missingNames.length > 0) {
  if (missingNames.length === 1) {
    console.error(`Missing required env var: ${missingNames[0]}`);
  } else {
    console.error(`Missing required env vars for ${scope}:`);
    for (const name of missingNames) {
      console.error(`- ${name}`);
    }
  }
  process.exit(1);
}

console.log(
  `All required env vars are set for ${scope}: ${requiredNames.join(", ")}`,
);

function getEnvFiles(explicitEnvFile) {
  if (explicitEnvFile) {
    return { cwd: root, files: [explicitEnvFile] };
  }

  return { cwd: root, files: LOCAL_ENV_FILES };
}

function parseArgs(argv) {
  const parsed = {
    envFile: undefined,
    noDotenv: false,
    scope: undefined,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--no-dotenv") {
      parsed.noDotenv = true;
    } else if (arg === "--scope") {
      parsed.scope = argv[index + 1];
      index += 1;
    } else if (arg.startsWith("--scope=")) {
      parsed.scope = arg.slice("--scope=".length);
    } else if (arg === "--env-file") {
      parsed.envFile = argv[index + 1];
      index += 1;
    } else if (arg.startsWith("--env-file=")) {
      parsed.envFile = arg.slice("--env-file=".length);
    } else if (!arg.startsWith("-") && !parsed.scope) {
      parsed.scope = arg;
    }
  }

  return parsed;
}
