var generator = require('generate-password');


module.exports = function genarate(length = 10, numbers = true){
    return generator.generate({
	length: length,
	numbers: numbers
});

}