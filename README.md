# wawjs-js-methods-with-functions-in-parameters

This script scrapes [https://developer.mozilla.org](https://developer.mozilla.org) and finds JavaScript methods (only from JS API) that have function in parameters.

# Usage

## Run
1. `npm install`
1. `npm start`

## Output
Output is stored in `output.txt` and `output.json`.

```
Array.prototype.every() - callback
Array.prototype.filter() - callback
Array.prototype.find() - callback
Array.prototype.findIndex() - callback
Array.prototype.forEach() - callback
Array.prototype.map() - callback
Array.prototype.reduce() - callback
Array.prototype.reduceRight() - callback
Array.prototype.some() - callback
Array.prototype.sort() - compareFunction
JSON.stringify() - replacer
Map.prototype.forEach() - callback
Promise.prototype.catch() - onRejected
Promise.prototype.finally() - onFinally
Promise.prototype.then() - onFulfilled, onRejected 
RegExp.prototype[@@replace]() - function (replacement)
Set.prototype.forEach() - callback
String.prototype.replace() - function
TypedArray.prototype.every() - callback
TypedArray.prototype.filter() - callback
TypedArray.prototype.find() - callback
TypedArray.prototype.findIndex() - callback
TypedArray.prototype.forEach() - callback
TypedArray.prototype.map() - callback
TypedArray.prototype.reduce() - callback
TypedArray.prototype.reduceRight() - callback
TypedArray.prototype.some() - callback
TypedArray.prototype.sort() - compareFunction
```