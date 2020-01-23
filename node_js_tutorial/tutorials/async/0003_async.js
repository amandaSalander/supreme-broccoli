const fs = require('fs')
// require module file system
const filePath =  'testfile.txt'
fs.readFile(filePath, (err, data) => {
  if (err) throw err
  console.log(data.toString())
});
