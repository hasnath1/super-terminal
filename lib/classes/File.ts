import {
  Dirent,
  existsSync,
  NoParamCallback,
  rmdir,
  rename,
  statSync,
  copyFile,
} from "fs";
import { unlink } from "fs/promises";
import { join, isAbsolute, parse, resolve } from "path";

const track = require("debug")("FILE_CLASS");

const _DEFAULT_ERROR_HANDLER: NoParamCallback = err => {
  if (err) throw new Error(err.message);
};

class File$Directory {
  name: string;
  isFile: boolean;
  isBlockDevice: boolean;
  isCharacterDevice: boolean;
  isDirectory: boolean;
  isSocket: boolean;
  isFIFO: boolean;
  isSymbolicLink: boolean;
  path: string;
  absolutePath: string;

  constructor(file: Dirent, abs_path: string) {
    this.name = file.name;
    this.isFile = file.isFile();
    this.isBlockDevice = file.isBlockDevice();
    this.isCharacterDevice = file.isCharacterDevice();
    this.isDirectory = file.isDirectory();
    this.isSocket = file.isSocket();
    this.isFIFO = file.isFIFO();
    this.isSymbolicLink = file.isSymbolicLink();

    if (!existsSync(abs_path))
      throw new Error(`${this.name} path/parent/dir not found`);
    this.path = abs_path;

    this.absolutePath = join(this.path, this.name);
    if (!existsSync(this.absolutePath))
      throw new Error(`${this.absolutePath} not found aka ABSOLUTEPATH`);
  }

  async delete(callback: NoParamCallback = _DEFAULT_ERROR_HANDLER) {
    try {
      if (this.isDirectory)
        rmdir(this.absolutePath, { recursive: true }, callback);
      if (this.isFile) await unlink(this.absolutePath);
    } catch (err) {
      throw new Error(
        `Failed to delete ${this.name} on path ${this.absolutePath}`
      );
    }
  }

  // prettier-ignore
  async rename(name: string, callback: NoParamCallback = _DEFAULT_ERROR_HANDLER) {

    const renameTo = join(this.path, parse(name).base);

    track("RENAME CURRENT : ", this.absolutePath);
    track("RENAME NAMED_TO  : ", renameTo);

    rename(this.absolutePath, renameTo, callback);
    this.name = renameTo;
    this.absolutePath = join(this.path, this.name);
  }

  async move(path: string, callback: NoParamCallback = _DEFAULT_ERROR_HANDLER) {
    let p: string;

    if (!isAbsolute(path)) {
      p = resolve(path);
    } else {
      p = path;
    }

    const file_directory = statSync(p);
    if (!file_directory.isDirectory)
      throw new Error(`****${p}**** must be directory !!!`);

    if (!existsSync(p))
      throw new Error(`****${p}**** directory does not exists  !!!`);

    track(`MOVE DEST : `, p);
    track(`MOVE SRC  : `, this.absolutePath);

    rename(this.absolutePath, p, callback);
    this.absolutePath = p;
  }

  // prettier-ignore
  async copyTo(path: string,callback: NoParamCallback = _DEFAULT_ERROR_HANDLER) {
    let p: string;

    if (!isAbsolute(path)) {
      p = resolve(path);
    } else {
      p = path;
    }

    track(`COPY DEST : `, p);
    track(`COPY SRC  : `, this.absolutePath);

    if (!existsSync(p)) throw new Error(`PATH : ${p} does not exists .`);

    copyFile(this.absolutePath, p ,callback);
  }
}

export default File$Directory;
export { File$Directory };
