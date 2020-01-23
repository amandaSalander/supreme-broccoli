const fs = require('fs')
const filePath1 = 'testfile.txt'
const filePath2 = 'testfile_1.txt'

fs.readFile(filePath1, (err, data1) => {
    if (err) throw err
    fs.readFile(filePath2, (err, data2) => {
    if (err) throw err
    const result = `${data1.toString()}\n${data2.toString()}`;
    console.log(result)
    });
});