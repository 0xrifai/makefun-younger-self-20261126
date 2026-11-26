// One Line to My Younger Self — make.fun entry
//
// Writes a single line, in English, to the absolute path /output/entry.txt.
// The line is the whole entry: one sentence, addressed directly to my
// younger self, no explanation and no second sentence.
//
// The line:
//   Kid, those shoes you're saving for a special day will outlive the day
//   itself — wear them on Tuesday.
//
// Why this line: everyone keeps a pair of shoes (or a shirt, or a bottle)
// in the back of the cupboard for a special day that never quite arrives.
// The sting is that the shoes will outlast the occasion. The turn is the
// last word — not "someday", but Tuesday, an ordinary day, because ordinary
// days are the only ones that ever actually come.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Kid, those shoes you're saving for a special day will outlive the day itself — wear them on Tuesday.";

// The gate counts characters, not bytes, and the entry must be 1–200
// characters of UTF-8 text, not only whitespace, in a single line.
function validate(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(
      `entry must be 1-200 characters, got ${chars.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(LINE);

// The grader runs the repository read-only, so the output directory must
// be created at the absolute path and the file written there — never a
// relative output/ directory, which would fail with exit 1.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// A short confirmation on stdout only; the entry file itself holds
// nothing but the line.
console.log(`wrote ${[...LINE].length} characters to /output/entry.txt`);
