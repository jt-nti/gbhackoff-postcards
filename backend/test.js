// https://www.raymondcamden.com/2017/01/09/quick-tip-for-testing-openwhisk-actions-locally
// node ./test.js rsstest/main param1=paramvalue param2=paramblah
// node ./test.js ./dist/gbhackoff-postcards-action key=test
// node ./test.js ./dist/bundle key=test
// node ./test.js ./index key=test

const actionToRun = process.argv[2];

let params = {};
for(var i=3;i<process.argv.length;i++) {
	let [name,value] = process.argv[i].split('=');
	params[name] = value;
}

const action = require(actionToRun).main;

let result = action(params);
Promise.resolve(result)
.then(result => console.log(result))
.catch(error => console.error(error));
