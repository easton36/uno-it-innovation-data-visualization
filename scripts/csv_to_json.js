const { readdirSync, readFileSync } = require('fs');

// load csv file
const parseCsv = (file) => {
	const data = readFileSync(file, 'UTF-8');
	// split the contents by new line
	const lines = data.split(/\r?\n/);

	const keys = lines[0].split(',');
	// remove the first line: header
	lines.shift();
	const parsedData = {};
	// iterate over each line with index
	for([index, line] of lines.entries()) {
		const values = line.split(',');
		const obj = {};
		if(values[0] === '') continue;
		// add values to object
		for([index, value] of values.entries()) {
			if(index === 0) continue;
			// convert string to number if possible
			obj[keys[index]] = !isNaN(value) ? Number(value) : value;
		}
		parsedData[values[0]] = obj;
	}

	return parsedData;
};

const main = () => {
	// create an array of csv files found in the data folder, get full path
	const csvFiles = readdirSync(`${__dirname}/../data`).filter(file => file.endsWith('.csv')).map(file => `${__dirname}/../data/${file}`);

	// iterate over each file
	for(file of csvFiles) {
		// parse the csv file
		const parsedData = parseCsv(file);
		// get the file name
		const fileName = file.split('/').pop().split('.')[0];
		console.log(`Writing ${fileName}.json`);
		// write the json file
		require('fs').writeFileSync(`${__dirname}/../data/json/${fileName}.json`, JSON.stringify(parsedData));
	}
};

main();