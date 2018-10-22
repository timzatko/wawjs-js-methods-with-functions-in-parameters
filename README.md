# wawjs-js-methods-with-functions-in-parameters

This script scrapes [https://developer.mozilla.org](https://developer.mozilla.org) and finds JavaScript methods (only from JS API) that have function in parameters.

# Usage

## Run
1. `npm install`
1. `npm run start`

## Output
Output is stored in `output.txt` and `output.json`.

```
Array.prototype.every()
Array.prototype.filter()
Array.prototype.find()
Array.prototype.findIndex()
Array.prototype.forEach()
Array.prototype.map()
Array.prototype.reduce()
Array.prototype.reduceRight()
Array.prototype.some()
Array.prototype.sort()
JSON.stringify()
Map.prototype.forEach()
Object.defineProperties()
Promise.prototype.catch()
Promise.prototype.finally()
Promise.prototype.then()
RegExp.prototype[@@replace]()
Set.prototype.forEach()
String.prototype.replace()
TypedArray.prototype.every()
TypedArray.prototype.filter()
TypedArray.prototype.find()
TypedArray.prototype.findIndex()
TypedArray.prototype.forEach()
TypedArray.prototype.map()
TypedArray.prototype.reduce()
TypedArray.prototype.reduceRight()
TypedArray.prototype.some()
TypedArray.prototype.sort()
```