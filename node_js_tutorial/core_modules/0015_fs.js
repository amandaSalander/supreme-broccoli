const fs = require('fs');

fs.open('test_file.txt', 'r', (err, fd) => {

    // Handle error if not existing file
    if (err) throw err;

    fs.close(fd, (err) => {
        // Handle error if not closing properly
        if (err) throw err;
    });
});


fs.open(Buffer.from('test_file.txt'), 'r', (err, fd) => {
    if (err) throw err;
    fs.close(fd, (err) => {
      if (err) throw err;
    });
});
