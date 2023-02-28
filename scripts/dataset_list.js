const fs = require('fs');

// get all files in ../data/json
const files = fs.readdirSync('../data/json');

// filter out files that don't end in .json
const jsonFiles = files.filter(file => file.endsWith('.json')).map(file => ({
    name: file.replace('.json', ''),
    unit: ''
}));

// save to array
fs.writeFileSync('datasets.json', JSON.stringify(jsonFiles));