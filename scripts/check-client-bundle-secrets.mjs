import { readFile, readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const root = resolve(".next/static");
const credentialPattern = /sb_secret_[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9._-]{60,}|token_hash=[A-Za-z0-9._-]+/;
let filesChecked = 0;

async function scan(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) {
      await scan(path);
    } else if (item.isFile()) {
      filesChecked++;
      if (credentialPattern.test(await readFile(path, "utf8"))) {
        throw new Error(`Credential-like content in client bundle: ${relative(root, path)}`);
      }
    }
  }
}

await scan(root);
console.log(`Checked ${filesChecked} client bundle files for credential patterns.`);
