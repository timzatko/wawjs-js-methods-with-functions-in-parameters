const { map, flatMap } = require('rxjs/operators');
const { forkJoin, from } = require('rxjs');

const request = require('request-promise-native');

const $ = require('cheerio');
const url = require('./mozilla-url');

const extractAllLinksToMethodsFromBodyPage = (body) => {
    console.log('Extracting all links to method pages...');

    return $('article', body)
        .find('li > a:nth-child(1)')
        .toArray()
        .map(el => $(el).attr('href'))
        .map(link => (link.indexOf('https://') === -1 ? `${url}/${link}` : link));
};

const getAllLinksToMethodsOnPage = () => {
    return map(body => extractAllLinksToMethodsFromBodyPage(body));
};

const getAllMethodsInformation = () => {
    return flatMap(links => {
        return forkJoin(links.map(link => getMethodInformationFromPage(link))).pipe(
            map(methods => methods.filter(method => method))
        );
    });
};

const getMethodInformationFromBody = (body) => {
    const name = $('h1', body).text();
    console.log(name);

    const parameters = $('#Parameters', body)
        .next('dl')
        .find('> dt')
        .toArray()
        .map(el => ({
            name: $(el).find('code').toArray().length ? $('code', el).text() : $(el).text(),
            description: $(el)
                .next('dd')
                .text()
        }));

    return { name, parameters };
};

const getMethodInformationFromPage = link => {
    // temp workaround because error stops the sequence and I don't know how to fix it
    const get = new Promise(resolve => {
        request
            .get(link, { timeout: 20000 })
            .then(data => resolve(data))
            .catch(() => resolve(null));
    });

    return from(get)
        .pipe(map(body => (body ? { ...getMethodInformationFromBody(body), link } : null)))
};

const isMethodParameterAFunction = description => {
    const match = pattern => description.match(pattern);
    return !!(match(/^function/i) || match(/Specifies a function/) || match(/^A function/i));
};

const filterMethodsWithFunctionParameter = () => {
    return map(methods =>
        methods.filter(method => {
            return method.parameters.some(({ description }) => isMethodParameterAFunction(description));
        })
    );
};

module.exports = {
    isMethodParameterAFunction,
    getMethodInformationFromBody,
    getAllLinksToMethodsOnPage,
    extractAllLinksToMethodsFromBodyPage,
    getAllMethodsInformation,
    filterMethodsWithFunctionParameter,
};
