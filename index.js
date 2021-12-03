// require filesystem

const fs = require('fs');

// reading files with try catch to catch errors
function readfile(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  }
  catch(e) {
    console.error(e);
  }
}

module.exports.sumfile = function(file, results = {}) {

const data = readfile(file),
splited = data.split('\n'); // splitting files by newline
prevTotal = 0;

  results[file] = 0;
  let firstFile = Object.keys(results)[0];

  for (let i = 0; i < splited.length; i++) {

    if (isFinite(splited[i])) {
      results[firstFile] += parseInt(splited[i], 10);
      results[file] = results[firstFile];
      console.log(results[file])
    } else {
      prevTotal = results[firstFile];
      results[firstFile] = this.sumfile(splited[i], results)[firstFile];
      results[splited[i]] -= prevTotal;
    }
  }

  return results
}

console.log(this.sumfile(process.env.FILE));
