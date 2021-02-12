const express = require("express");
const app = express();
const port = 5000;

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.get("/getcolorhtml", (req, res) => {
  const colorCodes = getColorCodes();
  const colorHTML = generateHTMLFromColorCodes(colorCodes);
	res.send(colorHTML);
});

app.listen(port, () => {
	console.log("Server Started");
});

//Get All possible color codes
function getColorCodes() {
  const maxLength = 256;
	let step = 8;
	const result = [];
	let currentCode = [256, 256, 256];
	do {
		result.push(currentCode.join(","));
		if (currentCode[2] > step) currentCode[2] -= step;
		else if (currentCode[1] > step) {
			currentCode[1] -= step;
			currentCode[2] = maxLength;
		} else if (currentCode[0] > step) {
			currentCode[0] -= step;
			currentCode[1] = maxLength;
			currentCode[2] = maxLength;
		}
	} while (result.length !== 32768);
  return result;
}

// generate HTML from colorCodes 
function generateHTMLFromColorCodes(result) {
		const context = result.map(
		(code) =>
			`<div style="background: rgb(${code}); width: 10px;height:10px; aspect-ratio: 1/1"></div>`
	);
	const html = `
        <div style="display: flex; flex-direction:row; background: #000; width: 1280px; flex-wrap: wrap">
            ${context.join(" ")}
        `;

	return html;
}
