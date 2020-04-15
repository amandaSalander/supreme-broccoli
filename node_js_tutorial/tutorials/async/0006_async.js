const async = require('async'),
        fs= require('fs');



async.parallel(
    [
        ()=> {
            fs.readFile('testfile.txt', (err, data) => {
            if (err) throw err
            console.log(data.toString());
            })
        },
        ()=> {
            fs.readFile('testfile_1.txt', (err, data) => {
            if (err) throw err
            console.log(data.toString());
            })
        }
    ],
    (err,results)=>{
        if (err) throw err;
        console.log("FINISHED");
    }
)