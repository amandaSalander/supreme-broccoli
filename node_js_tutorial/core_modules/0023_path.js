const path = require('path');


a = path.basename('/tmp/myfile.html');
console.log(a);


// To achieve consistent results when working with Windows file
// paths on any operating system, use path.win32:

b = path.win32.basename('C:\\temp\\myfile.html');
console.log(b);


// To achieve consistent results when working with POSIX file
// paths on any operating system, use path.posix:

c = path.posix.basename('/tmp/myfile.html');
console.log(c);


/* Path basename method
    The path.basename() methods returns the last portion of a
    path, similar to the Unix basename command. Trailing
    directory separators are ignored, see path.sep.
*/

console.log( path.basename('/foo/bar/baz/asdf/quux.html') );

console.log( path.basename('/foo/bar/baz/asdf/quux.html', '.html') );

/* Path delimiter provide the platfrom path delimiter */

// on POSIX
console.log(process.env.PATH);
console.log(process.env.PATH.split(path.delimiter));


/* Path dirname return directory name of file */
console.log(path.dirname('/foo/bar/baz/asdf/quux.html'));

/* Path extname return extension of file path */

console.log(path.extname('/foo/bar/baz/asdf/quux.html'));


/* Path format return a path string from path object
    path Object; {
        dir <string>
        root <string>
        base <string>
        name <string>
        ext <string>
    }
*/

// example 1
let file_path = path.format({
    root: '/',
    dir: '/home/amanda/potato',
    base: 'chips.txt'
});

console.log(file_path);

// IMPORTANT : `name` + `ext` will be used if `base` is not specified.

// example 2
file_path = path.format({
    root: '/home/amanda/potato/',
    name: 'chips',
    ext: '.txt'
});

console.log(file_path);


/* path.parse(path) return path object from path string */

console.log(path.parse('/home/amanda/potato/chips.txt'));
