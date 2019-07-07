const fetch = require("node-fetch");
const URL = id => `https://quizlet.com/${id}/info`;
const fs = require("fs");

const COLOR = {BLACK: "\x1b[30m", GREEN: "\x1b[32m", RED: "\x1b[31m", RESET: "\x1b[0m"};

var sets = require("./sets.js");

async function collect() {
	console.log(COLOR.BLACK, "[", COLOR.GREEN, "+", COLOR.BLACK, "]", "Collecting data...", COLOR.RESET);
	for (let set of sets) {
		// Milliseconds elapsed since the UNIX epoch
		var time = Date.now();

		// Get users who have studied the set.
		var req = await fetch(URL(set.id), {
			headers: {
				"X-Requested-With": "XMLHttpRequest"
			}
		});
		var res = await req.json();
		if (!res.studyingUsers) {
			console.log(COLOR.BLACK, "[", COLOR.RED, "-", COLOR.BLACK, "]", "It looks like set #" + set.id + " doesn't exist. Closing program..", COLOR.RESET);
			process.exit(0);
		}
		var allStudiers = res.studyingUsers.map(i => i.username);

		// Push new studiers
		if (!set.studiers) set.studiers = [];
		var loggedStudiers = set.studiers.map(i => i.username);
		var newStudiers = allStudiers.filter(studier => loggedStudiers.indexOf(studier) === -1);
		set.studiers.push(...newStudiers.map(username => { return {username, time} }));
	}
	// Update sets.json file
	fs.writeFileSync(__dirname + "/sets.js", `var data = ${JSON.stringify(sets)}\nif (typeof module !== "undefined") module.exports = data`);
	console.log(COLOR.BLACK, "[", COLOR.GREEN, "+", COLOR.BLACK, "]", "Data collected successfully!", COLOR.RESET);
};

console.log(COLOR.BLACK, "[", COLOR.GREEN, "+", COLOR.BLACK, "]", "Collecting data once every hour.", COLOR.RESET);

collect();
setInterval(collect, 3600000 /* one hour */);