import { readdir } from "fs/promises";
import { File$Directory } from "../classes/File";
import { resolve } from "path";

async function ls(path: string) {
  // get all the files .
  const filesDirent = await readdir(path, { withFileTypes: true });
  const abs_path = resolve(path);

  const files = filesDirent.map(file => new File$Directory(file, abs_path));
  return files;
}

export { ls };
