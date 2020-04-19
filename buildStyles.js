const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const sass = require('node-sass');

const argv = process.argv;

if (argv.length != 3) {
    console.log('Usage:');
    console.log('node buildStyles "path_to_source_stylesheet"');
    return;
}

const sourceFile = argv[2];
const sourceFileDir = path.dirname(sourceFile);

console.log('sourceFile', sourceFile);
console.log('sourceFileDir', sourceFileDir);

const sourceFileWithoutExtn = path.basename(sourceFile, path.extname(sourceFile));
const destinationCssFile = path.join(sourceFileDir, sourceFileWithoutExtn) + '.css';
const destinationJsFile = path.join(sourceFileDir, sourceFileWithoutExtn) + '.js';

console.log('destinationCssFile', destinationCssFile);
console.log('destinationJsFile', destinationJsFile);

// Watch for file changes
chokidar.watch(sourceFileDir + "/**/*.scss").on('all', (event, path) => {
    // File changed
    // Start the compilation
    const result = sass.renderSync({
      file: sourceFile,
      outFile: destinationCssFile
    });
    
    // console.log(result.css);
    // console.log(result.map);
    // console.log(result.stats);

    // SCSS to CSS compilation complete
    // Next, compile CSS to a JS String

    let start = 'export default `';
    let end = '`';
    const jsString = start + result.css + end;

    fs.writeFile(destinationJsFile, jsString, (err) => {
      if (err) {
        console.log('Error: JS file creation failed');
        console.log(err);
        return;
      }
      console.log("Success: JS file created");

    });
});
