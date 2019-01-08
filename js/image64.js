var fs = require('fs');
var file;
function convert64(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
}
var base64 = convert64('../images/download.jpg');
// console.log(base64);

