import { writeFile } from "node:fs/promises";

import { createClient } from "@supabase/supabase-js";
import { put } from "@vercel/blob";

import { requireEnv, loadLocalEnv } from "./lib/index.mjs";

const TABLE_NAME = "waitlist_subscribers";
const BACKUP_FILE = "waitlist_subscribers.csv";
const BACKUP_COLUMNS = ["id", "email", "created_at", "notified_at"];
const PAGE_SIZE = 1000;

loadLocalEnv();

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const supabase = createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SECRET_KEY"),
  );

  const blobToken = requireEnv("BLOB_READ_WRITE_TOKEN");

  const rows = await fetchAllSubscribers(supabase);

  const csv = toCsv(rows);

  const date = new Date().toISOString().slice(0, 10);
  const pathname = `backups/waitlist-subscribers-${date}.csv`;

  await writeFile(BACKUP_FILE, csv);

  const blob = await put(pathname, csv, {
    access: "private",
    token: blobToken,
    addRandomSuffix: false,
    contentType: "text/csv",
  });

  console.log(`exported ${rows.length} subscribers`);
  console.log(`uploaded ${blob.pathname}`);
}

async function fetchAllSubscribers(supabase) {
  const subscribers = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select(BACKUP_COLUMNS.join(","))
      .order("id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      throw new Error(error.message);
    }

    subscribers.push(...data);

    if (data.length < PAGE_SIZE) {
      return subscribers;
    }
  }
}

function toCsv(rows) {
  const lines = [BACKUP_COLUMNS.join(",")];

  for (const row of rows) {
    lines.push(BACKUP_COLUMNS.map((column) => csvValue(row[column])).join(","));
  }

  return `${lines.join("\n")}\n`;
}

function csvValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);

  if (!/[",\n\r]/.test(text)) {
    return text;
  }

  return `"${text.replaceAll('"', '""')}"`;
}
