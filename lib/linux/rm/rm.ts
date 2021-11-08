import { spawnSync } from "child_process";
import { existsSync } from "fs";

async function rm(path: string) {
  const shell = existsSync("/usr/bin/bash") ? "/usr/bin/bash" : true;
  spawnSync(`rm -rf ${path}`, {
    shell: shell,
  });
}

export { rm };
export default rm;
