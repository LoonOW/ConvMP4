const fs = require('fs')

var data = fs.readFileSync('C:\\Users\\cocoh\\Documents\\Logiciels\\ConvMP3\\back.txt', 'utf8');
var message = data + "\nmsg";
fs.writeFile('C:\\Users\\cocoh\\Documents\\Logiciels\\ConvMP3\\back.txt', message, function(erreur) {
	if (erreur) {
		console.log(erreur);
	}
})