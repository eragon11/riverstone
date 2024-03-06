const fs = require("fs-extra");

try {
    fs.removeSync("./dist/");
} catch (error) {
    console.error(error);
}