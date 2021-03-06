const shortId = require("shortid");
const touch = require("touch");
const path = require("path");
const replace = require("replace-in-file");
const  UglifyJS = require("uglify-js");

const fileNameGenerator = async (code, extension) => {
  try {
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "files",
      `${shortId.generate()}.${extension}`
    );
    touch(filePath);
    const data = UglifyJS.minify(code);
    if(!data.error){
      const options = {
        files: filePath,
        from: "",
        to: data.code,
      };
      await replace(options);
      return {
        filePath,
        error: null
      }
    }
  } catch (error) {
    return {
      error
    }
  }
};

const _ = `
console.log('lol');
console.log('lol');
console.log('lol');




console.log('lol');


console.log('lol');
`

fileNameGenerator(_, "js");
module.exports = fileNameGenerator;
