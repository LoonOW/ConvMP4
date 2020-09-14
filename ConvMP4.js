class Dl {
	download(name){
		const fs = require('fs');
		const puppeteer = require('puppeteer');
		const colors = require('colors');
		const exec = require('child_process').exec;
		(async () => {
			function sleep(milliseconds) {
				const date = Date.now();
				let currentDate = null;
				do {
					currentDate = Date.now();
				} while (currentDate - date < milliseconds);
			}
			function openSubl() {
				const child = exec('subl C:\\Users\\Corentin\\Documents\\dev\\ConvMP4\\back.txt',
				(error, stdout, stderr) => {
				    if (error !== null) {
				        console.log(`exec error: ${error}`);
				    }
				});
			}
			function WriteError(errorback) {
				var data = fs.readFileSync('C:\\Users\\Corentin\\Documents\\dev\\ConvMP4\\back.txt', 'utf8');
				var today = new Date();
				var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/'+today.getDate();
				var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				var dateTime = date + ' | ' + time;
				var message = data + "\n" + errorback + " _____" + dateTime;
				fs.writeFile('C:\\Users\\Corentin\\Documents\\dev\\ConvMP4\\back.txt', message, function(erreur) {
					if (erreur) {
						console.log(erreur.toString().red);
					}
				})
				openSubl();
			}
			function goodEndDownload(songName) {
				console.log(" {".cyan.bgMagenta + songName.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[==========100%]".blue + "<--_____--Download complete--_____-->".yellow);
				console.log("====================================================================================".green);
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + songName.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download finished " + "[_SUCCESS_]".green.bold);
				console.log("====================================================================================".green);
			}
			const browser = await puppeteer.launch();//Open browser with puppeteer, to see the window, add {headless: false} in parameters

			console.log("\\i/".green.bold + " Starting download process for : " + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta);
			console.log("====================================================================================".green);

			//Open a page with Youtube
			const page = await browser.newPage();
			page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[10%---------]".blue + "<--_____--Start Youtube--_____-->".yellow);
			var errorback = await page.goto('https://www.youtube.com/')
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Youtube n'est pas accessible pour le moment /|\\ ".red + " " + e.toString().red);
				openSubl();
				return(false);
			});
			if (errorback == false) {
				return(false);
			};
			
			//Type the name of the song in the youtube searchbar
			await page.waitFor(1000);
			var errorback = await page.evaluate(() => {
				const obj = document.querySelector('input[id="search"]');
				obj.select();
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " La barre de recherche Youtube n'est pas disponible /|\\ ".red + " " + e.toString().red);
				openSubl();
				return(false);
			});
			if (errorback == false) {
				return(false);
			};
			await page.keyboard.type(name);
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[==30%-------]".blue + "<--_____--Try to find the video URL--_____-->".yellow);

			//Submit the search
			await page.waitFor(500);
			var errorback = await page.evaluate(() => {
				const obj = document.querySelector('button[id="search-icon-legacy"]');
				obj.click();
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Le bouton de recherche Youtube n'est pas accessible /|\\ ".red + " " + e.toString().red);
				openSubl();
				return(false);
			});
			if (errorback == false) {
				return(false);
			};

			//Clic on the video and get the url
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[====50%-----]".blue + "<--_____--Youtube video find--_____-->".yellow);
			await page.waitFor(1000);
			await page.screenshot({path: 'C:\\Users\\Corentin\\Documents\\dev\\ConvMP4buddy-screenshot.png'});
			var errorback = await page.evaluate(() => {
				const obj = document.querySelector('a[id="video-title"]');
				obj.click();
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " La vidéo Youtube n'est pas accessible /|\\ ".red + " " + e.toString().red);
		    	openSubl();
		    	return(false);
			});
			if (errorback == false) {
				return(false);
			};
			const url = page.url();
			await page.waitFor(1000);
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[======70%---]".blue + "<--__________--Video URL find--___________-->".yellow);

			//Close browser
			await browser.close();

			//Start downloading of the audio file with youtube-dl
			/*
			File download option
			-a, --batch-file FILE            File containing URLs to download ('-' for
			                                 stdin), one URL per line. Lines starting
			                                 with '#', ';' or ']' are considered as
			                                 comments and ignored.
			*/
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[========90%-]".blue + "<--__________--Starting download--___________-->".yellow);
			const child = exec('youtube-dl -o "C:\\Users\\Corentin\\Documents\\ConvMP4\\%(title)s.%(ext)s" --format mp4 ' + url,
			(error, stdout, stderr) => {
				//console.log(`stdout: ${stdout}`);
				//console.log(`stderr: ${stderr}`);
				if (error !== null) {
					console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
					console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Erreur lors du téléchargement /|\\ ".red);
			        console.log(`exec error: ${error}`.red);
			        openSubl();
			    } else {
			    	goodEndDownload(name);
			    }
			});
		})()
		.catch(function (e) {
			console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
			console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Une erreur interne est survenue /|\\ ".red + " " + e.toString().red);
		});
		return(true);
	}
}

module.exports.Dl = Dl;