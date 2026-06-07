import { spawn } from "node:child_process";

import { loadLocalEnv } from "./lib/index.mjs";

const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error(
    "Usage: node scripts/run-with-local-env.mjs <command> [...args]",
  );
  process.exit(1);
}

loadLocalEnv();

const child = spawn(command, args, {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
