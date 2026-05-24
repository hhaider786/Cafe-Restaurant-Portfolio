import fs from "node:fs/promises";
import path from "node:path";

const LOG_DIR = ".data";
const LOG_FILE = "submissions.log";

export async function logSubmission(category: string, payload: Record<string, unknown>) {
  try {
    const dir = path.join(process.cwd(), LOG_DIR);
    await fs.mkdir(dir, { recursive: true });
    const line = JSON.stringify({
      ts: new Date().toISOString(),
      category,
      ...payload,
    });
    await fs.appendFile(path.join(dir, LOG_FILE), line + "\n", "utf8");
  } catch (err) {
    console.error("[mockEmail] failed to log submission:", err);
  }
}
