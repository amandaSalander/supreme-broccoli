/**
 * try parsing str to int if it fails returns
 * the defaultValue
 * @param  {string} str value to be parsed
 * @param  {any} defaultValue
 * @return {Number or any} the result of the parsed
 * tentative
 */
function TryParseInt(str,defaultValue) {
    var retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}


module.exports = {TryParseInt};