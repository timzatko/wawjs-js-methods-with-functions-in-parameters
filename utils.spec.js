'use strict';

const assert = require('assert');
const utils = require('./utils');

const $ = require('cheerio');

describe('isMethodParameterAFunction', function() {
    it('should detect if parameter is a function based in its description', function() {
        assert(utils.isMethodParameterAFunction('A Function called when the Promise is rejected.') === true);
        assert(utils.isMethodParameterAFunction('Specifies a function called when the Promise is rejected.') === true);
        assert(utils.isMethodParameterAFunction('Function') === true);
    });
});

describe('getMethodInformationFromBody', function() {
    it('should extract method information from method mdn page DOM', function() {
        const body = `<body><h1>Array.prototype.map()</h1><div>
                            <div id="Parameters">...</div>
                            <dl>
                                <dt>callback</dt>
                                <dd>Function that is called...</dd>
                                <dt>another</dt>
                                <dd>another argument...</dd>
                            </dl>                            
                        </div></body>`;

        const result = utils.getMethodInformationFromBody(body);

        assert(result.name === 'Array.prototype.map()', 'method name is invalid');
        assert(result.parameters.length === 2, 'incorrect number of parameters');
        assert(result.parameters[0].name === 'callback', 'incorrect name of first parameter');
        assert(result.parameters[0].description === 'Function that is called...', 'incorrect description of first parameter');
    });

    it('should ignore nested parameters', function() {
        const body = `<body><h1>Object.prototype.something()</h1><div>
            <div id="Parameters">...</div>
            <dl>
                <dt>options</dt>
                <dd>Interesting...
                    <dl>
                        <dt>subOption1</dt>
                        <dd>Description of subOption1</dd>
                        <dt>subOption2</dt>
                        <dd>Description of subOption2</dd>
                    </dl>
                </dd>
            </dl>                            
        </div></body>`;

        const result = utils.getMethodInformationFromBody(body);
        assert(result.parameters.length === 1);
    });

    it('should handle html in parameter names', function() {
        const body = `<body><h1>
            <div id="Parameters">...</div>
            <dl>
                <dt><code>callback</code></dt>
                <dd>Interesting...</dd>
            </dl>                            
        </div></body>`;

        const result = utils.getMethodInformationFromBody(body);
        assert(result.parameters[0].name === 'callback');
    });
});

describe('extractAllLinksToMethodsFromBodyPage', function() {

    it('should extract all links to methods', function() {
        const body = `<body><article><ul>
            <li>
                <a href="https://1">link1</a>
                <a href="https://2">this link should be ignored</a>
                <div>
                    Blah blah, link somewhere else, probably docs - <a href="https://3">this one also</a>
                </div>
            </li>
            <li><a href="https://4">link2</a></li>
            <li><a href="https://5">link3</a></li>
        </ul></article></body>`;

        const links = utils.extractAllLinksToMethodsFromBodyPage(body);

        assert(links.indexOf('https://1') !== -1);
        assert(links.indexOf('https://2') === -1);
        assert(links.indexOf('https://3') === -1);
        assert(links.indexOf('https://4') !== -1);
        assert(links.indexOf('https://5') !== -1);
    });

});

