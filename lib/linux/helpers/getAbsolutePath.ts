import { existsSync } from "fs";
import { spawnSync } from "child_process";
import { join } from "path";

export function getAbsolutePath(path: string) {
  const shell = existsSync("/usr/bin/bash") ? "/usr/bin/bash" : true;

  const pwd = spawnSync("pwd", { shell: shell }).stdout.toString().trim();

  return path.startsWith("/") ? path : join(pwd, path);
}
