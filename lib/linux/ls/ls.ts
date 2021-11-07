import { spawn, spawnSync } from "child_process";
import { existsSync } from "fs";

class FileList {
  total: number;
  filesAndDic: FileType[];
  constructor(total: number, filesAndDic: FileType[]) {
    this.total = total;
    this.filesAndDic = filesAndDic;
  }
}

class FileType {
  fileName: string;
  permissions: string;
  size: number;
  isDic: boolean;
  isFile: boolean;

  constructor(fileInfo: string[]) {
    this.fileName = fileInfo[fileInfo.length - 1];
    this.permissions = fileInfo[0];
    this.size = parseInt(fileInfo[4]);
    this.isDic = this.permissions[0] === "d";
    this.isFile = this.permissions[0] === "-";
  }
}

/**
 * Must provide an absolute path . eg : /home/user/Desktop/
 * @param { string } path
 * @returns
 */

async function ls(path: string) {
  try {
    // get the bash to execute the "ls" command
    const shell = existsSync("/usr/bin/bash") ? "/usr/bin/bash" : true;

    const { stdout, stderr } = spawnSync(
      `ls -la ${path === "." ? __dirname : path}`,
      { shell: shell }
    );

    // handling all possible errors
    const err = stderr.toString();
    if (err) throw new Error(err);

    // structure all the files and directories
    const filesArray = stdout.toString().split("\n").slice(3, -1); // slicing the first 3 lines . "total {number}" & "." & ".."

    const files = filesArray.map(fileInfo => {
      const file = fileInfo.split(" ").filter(value => Boolean(value) && value);
      console.log(file);

      return new FileType(file);
    });

    return new FileList(files.length, files);
  } catch (e) {
    console.log("Seeing the error from *****ls********", e);
  }
}
