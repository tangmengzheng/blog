(function () {

//	var ccap = require('ccap');
    var captchagen = require('captchagen');

	var cap = {};

	cap.getCaptcha = function () {
        var rand = (new Date().getTime()) % 1000000;
        if (rand < 100000){
            rand = rand + 100000;
        }
        var captcha = captchagen.create({text:rand.toString()});
        var text = captcha.text();
        captcha.generate();
        var buffer = captcha.buffer();
        return [text, buffer];
	}

	module.exports = cap;
})();
