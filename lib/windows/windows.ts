import path from "path";
import fs from "fs";

const log = console.log;
const folder = "./";

fs.readdirSync(folder).forEach(file => {
  const extname = path.extname(file);
  const filename = path.basename(file, extname);
  const absolutePath = path.resolve(folder, file);

  log("File : ", file);
  log("filename : ", filename);
  log("extname : ", extname);
  log("absolutePath : ", absolutePath);
});
