const { PI } = Math;

// export to the file that require this file the area
// and the circumference functions

// this is a function
exports.area = (r) => PI * r ** 2;
// this is a function too
exports.circumference = (r) => 2 * PI * r;