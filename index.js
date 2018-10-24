const { from } = require('rxjs');
const request = require('request-promise-native');
const fs = require('fs');

const url = require('./mozilla-url');

const {
    getAllLinksToMethodsOnPages,
    filterMethodsWithFunctionParameter,
    getAllMethodsInformation,
    isParamFunction
} = require('./utils');

from(request.get(url + '/bm/docs/Web/JavaScript/Reference/Methods_Index'))
    .pipe(getAllLinksToMethodsOnPages())
    .pipe(getAllMethodsInformation())
    .pipe(filterMethodsWithFunctionParameter())
    .subscribe(methods => {
        methods.sort((a, b) => a.name.toString().localeCompare(b.name));

        const names = methods.map(
            ({ name, parameters }) =>
                `${name} - ${parameters
                    .filter(({ description }) => isParamFunction(description))
                    .map(param => param.name)
                    .join(', ')}`
        );

        fs.writeFileSync('output.json', JSON.stringify(methods));
        fs.writeFileSync('output.txt', names.join('\n'));

        console.log('Successful!');
    });
