const { map, flatMap } = require('rxjs/operators');
const { forkJoin, from } = require('rxjs');

const request = require('request-promise-native');

const $ = require('cheerio');
const url = require('./mozilla-url');

const getAllLinksToMethodsPages = () => {
    return map(body =>
        $('article', body)
            .find('li > a:nth-child(1)')
            .toArray()
            .map(el => $(el).attr('href'))
            .map(link => (link.indexOf('https://') === -1 ? `${url}/${link}` : link))
    );
};

const getAllMethodsInformation = () => {
    return flatMap(links => {
        return forkJoin(links.map(link => getMethodInformation(link))).pipe(
            map(methods => methods.filter(method => method))
        );
    });
};

const getMethodInformation = link => {
    // temp workaround because error stops the sequence and I don't know how to fix it
    const get = new Promise(resolve => {
        request
            .get(link)
            .then(data => resolve(data))
            .catch(() => resolve(null));
    });

    return from(get).pipe(
        map(body => {
            if (body) {
                const name = $('h1', body).text();
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

                return { name, parameters, link };
            }

            return null;
        })
    );
};

const isParamFunction = description => {
    const match = pattern => description.match(pattern);
    return match(/^function/i) || match(/Specifies a function/) || match(/^A function/i);
};

const filterMethodsWithFunctionParameter = () => {
    return map(methods =>
        methods.filter(method => {
            return method.parameters.some(({ description }) => isParamFunction(description));
        })
    );
};

module.exports = {
    getAllLinksToMethodsPages,
    getAllMethodsInformation,
    filterMethodsWithFunctionParameter,
    isParamFunction
};
