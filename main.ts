// main.ts — news-image-20261122 entry.
// Copies the pre-rendered entry.png into the output directory.
// Deterministic: the output bytes are exactly the bytes of entry.png.
// Node 22, standard library only, no network at runtime.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
const src = join(repoRoot, "entry.png");
const dst = join(outDir, "entry.png");

// Create the output directory if needed. Never delete it: on the grader
// /output is a mount point whose parent is not writable, so removing it
// fails with EACCES and the run exits 1.
// Fail loudly if the image is missing, so a broken run is never silent.
if (!existsSync(src)) {
  throw new Error("entry.png not found next to main.ts: " + src);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
