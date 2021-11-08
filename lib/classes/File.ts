import { statSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

class File {
  name: string;
  path: string;
  isFile: boolean;
  isDirectory: boolean;
  permissions: any;

  /**
   * @param {string} path name --> file or directory name .
   * @param {string} name path --> absolute path is required to have the proper functionalities
   */

  constructor(name: string, path: string) {
    this.name = name;
    this.path = join(path, name);
    this.isFile = statSync(this.path).isFile();
    this.isDirectory = statSync(this.path).isDirectory();
  }

  delete() {
    spawnSync(`rm -rf ${this.path}`);
  }
  rm() {
    spawnSync(`rm -rf ${this.path}`);
  }

  append() {}
}

export { File };
export default File;
