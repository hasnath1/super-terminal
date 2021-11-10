import { readdir } from "fs/promises";

async function ls(path: string) {
  const files = await readdir(path, { withFileTypes: true });
  files.forEach(file => {
    console.log(file);
  });
}

export { ls };
