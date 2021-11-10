import { resolve } from "path";
import { ls } from "./lib/commands/ls";

const x = ls("./test");

x.then(data => {
  data.forEach(file => {
    const path = resolve("./test/testname/");

    console.log(file.name);

    if (file.name === "test") file.copyTo("./test/testname");

    // file.move(path);
  });
});
