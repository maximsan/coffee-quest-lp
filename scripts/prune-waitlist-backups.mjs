import { del, list } from "@vercel/blob";

import { loadMaintenanceEnv, requireEnv } from "./lib/loadMaintenanceEnv.mjs";

const BACKUP_PREFIX = "backups/waitlist-subscribers-";
const KEEP_COUNT = 14;

loadMaintenanceEnv();

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const token = requireEnv("BLOB_READ_WRITE_TOKEN");
  const { blobs } = await list({ prefix: "backups/", token });

  const waitlistBlobs = blobs.filter((blob) =>
    blob.pathname.startsWith(BACKUP_PREFIX),
  );

  const oldBlobs = waitlistBlobs
    .sort((a, b) => b.pathname.localeCompare(a.pathname))
    .slice(KEEP_COUNT);

  for (const blob of oldBlobs) {
    await del(blob.url, { token });
    console.log(`pruned ${blob.pathname}`);
  }

  console.log(
    `kept ${Math.min(waitlistBlobs.length, KEEP_COUNT)} waitlist backups`,
  );
}
