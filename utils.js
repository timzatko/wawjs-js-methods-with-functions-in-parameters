const { map, flatMap, catchError } = require('rxjs/operators');
const { forkJoin, from, of } = require('rxjs');

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

    return from(get)
        .pipe(
            catchError(() => {
                console.error(`Failed to open method page ${link}`);
                return of(undefined);
            })
        )
        .pipe(
            map(body => {
                if (body) {
                    const name = $('h1', body).text();
                    const parameters = $('#Parameters', body)
                        .next('dl')
                        .find('dd')
                        .toArray()
                        .map(el => $(el).text());

                    return { name, parameters, link };
                }

                return null;
            })
        );
};

const filterMethodsWithFunctionParameter = () => {
    return map(methods =>
        methods.filter(method => {
            return method.parameters.filter(method => {
                const match = (pattern) => method.match(pattern);
                return match(/^function/i) || match(/Specifies a function/) || match(/^A function/i);

            }).length;
        })
    );
};

module.exports = {
    getAllLinksToMethodsPages,
    getAllMethodsInformation,
    filterMethodsWithFunctionParameter,
};
