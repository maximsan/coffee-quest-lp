import { del, list } from "@vercel/blob";

import { requireEnv, loadLocalEnv } from "./lib/index.mjs";

const FILTER_PREFIX = "backups/";
const FULL_PREFIX = "backups/waitlist-subscribers-";
// Keep two weeks of daily backups for recent restore coverage
// without unbounded Blob growth.
const DAILY_BACKUP_RETENTION_COUNT = 14;

loadLocalEnv();

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const token = requireEnv("BLOB_READ_WRITE_TOKEN");

  const { blobs } = await list({ prefix: FILTER_PREFIX, token });

  const waitlistBlobs = blobs.filter((blob) =>
    blob.pathname.startsWith(FULL_PREFIX),
  );

  const oldBlobs = waitlistBlobs
    .sort((a, b) => b.pathname.localeCompare(a.pathname))
    .slice(DAILY_BACKUP_RETENTION_COUNT);

  for (const blob of oldBlobs) {
    await del(blob.url, { token });
    console.log(`pruned ${blob.pathname}`);
  }

  const keptCount = waitlistBlobs.length - oldBlobs.length;

  console.log(
    `found ${waitlistBlobs.length} waitlist backups; pruned ${oldBlobs.length}; kept ${keptCount}; retention ${DAILY_BACKUP_RETENTION_COUNT} daily backups`,
  );
}
