import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { File } from "../../classes/File";
import { getAbsolutePath } from "../helpers/getAbsolutePath";

/**
 * Must provide an absolute path . eg : /home/user/Desktop/
 * @param { string } path
 * @returns
 */

async function ls(path: string) {
  try {
    // get the bash to execute the "ls" command
    const shell = existsSync("/usr/bin/bash") ? "/usr/bin/bash" : true;
    const realPath = getAbsolutePath(path);

    const { stdout, stderr } = spawnSync(`ls -A ${realPath}`, { shell: shell });

    // handling all possible errors
    const err = stderr.toString();
    if (err) throw new Error(err);

    return stdout
      .toString("utf-8")
      .split("\n")
      .filter(value => value && value)
      .map(file => new File(file, realPath));
  } catch (e) {
    console.log("Seeing the error from *****ls********", e);
  }
}

export default ls;
