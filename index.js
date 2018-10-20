const { from } = require('rxjs');
const request = require('request-promise-native');
const fs = require('fs');

const url = require('./mozilla-url');

const utils = require('./utils');

from(request.get(url + '/bm/docs/Web/JavaScript/Reference/Methods_Index'))
    .pipe(utils.getAllLinksToMethodsPages())
    .pipe(utils.getAllMethodsInformation())
    .pipe(utils.filterMethodsWithFunctionParameter())
    .subscribe(methods => {
        const names = methods.map(({ name }) => name);

        fs.writeFileSync('output.json', JSON.stringify(methods));
        fs.writeFileSync('output.txt', names.join('\n'));
        
        console.log('Successful!');
    });
