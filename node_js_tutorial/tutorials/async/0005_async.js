const fs = require('fs') // require the standard NodeJS fs module
const filePaths = [
  'testfile.txt',
  'testfile.txt',
  'testfile.txt',
  'testfile.txt',
  'testfile.txt'
]

const contents = [] // storage for contents of files

/**
 * Processes the results of calling fs.readFile.
 *
 * @param  {Error} [err]      - from call to fs.readFile
 * @param  {Buffer} [data=''] - returned from call to fs.readFile
 * @return {null}
 *
 * @throws Exception
 */
const processResult = (err, data = '') => {
  if (err) throw err
  contents.push(data.toString())
  if (filePaths.length) { // there are still filePaths to process
    // if so, handle the next filePath
    fs.readFile(filePaths.shift(), processResult)
  } else {
    // or print the results!
    console.log(contents.join('\n'))
  }
}

// process the files
fs.readFile(filePaths.shift(), processResult)