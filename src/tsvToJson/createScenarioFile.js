// @ts-nocheck

const fs = require('fs').promises;
const path = require('path');


const tsvDirPath = __dirname + "/tsv";
const jsonDirPath = __dirname + "/json";

fs.readdir(tsvDirPath, { withFileTypes: true }, (err, dirents) => {
	if (err) {
		console.dir(err);
		return;
	}
}).then((dirents) => {
	for (const dirent of dirents) {
		const fp = path.join(tsvDirPath, dirent.name);
		const exportFp = path.join(jsonDirPath, dirent.name.split(".")[0] + ".json");
		if (dirent.isFile()) {
			fs.readFile(fp, { encoding: "utf8" }, (err, data) => {
				if (err) {
					console.dir(err);
					return;
				}
			}).then((data) => {
				const dataArr = data.split("\n");
				if (dataArr.length === 0) return;
				let titleKeys = [];
				let result = [];
				dataArr.map((data, i) => {
					if (!data.split("\r")[0]) return;
					if (i === 0) {
						//title key
						titleKeys = data.split("\r")[0].split("\t");
						return;
					}
					//data
					let obj = {};
					let choices = [];
					let answers = [];
					let stressPoints = [];
					let comments = [];
					titleKeys.map((t, i) => {
						if (!data.split("\r")[0]) return;

						const addData = data.split("\r")[0].split("\t")[i];

						if (t === "choice1") {
							if (addData) {
								choices.push(addData);
							}
							return;
						} else if (t === "choice2") {
							if (addData) {
								choices.push(addData);
							}
							obj["choices"] = choices;
							return;
						}

						if (t === "answer1") {
							if (addData) {
								answers.push(addData);
							}
							return;
						} else if (t === "answer2") {
							if (addData) {
								answers.push(addData);
							}
							obj["answer"] = answers;
							return;
						}

						if (t === "stressPoint1") {
							if (addData) {
								stressPoints.push(Number(addData));
							}
							return;
						} else if (t === "stressPoint2") {
							if (addData) {
								stressPoints.push(Number(addData));
							}
							obj["stressPoints"] = stressPoints;
							return;
						}

						if (t.indexOf("comment") === 0) {
							comments.push(addData);
							if (t === "comment20") {
								obj["comments"] = comments;
								return;
							}
							return;
						}

						obj[t] = addData;
					});
					result.push(obj);
				})
				fs.writeFile(exportFp, JSON.stringify(result, '', ' '));
			})
		}
	}
})
