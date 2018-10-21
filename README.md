# wawjs-js-methods-with-functions-in-parameters

This script scrapes [https://developer.mozilla.org](https://developer.mozilla.org) and finds JavaScript methods (only from JS API) that have function in parameters.

# Usage

## Run
1. `npm install`
1. `npm run start`

## Output
Output is stored in `output.txt` and `output.json`.

```
Promise.prototype.catch()
Object.defineProperties()
Array.prototype.every()
TypedArray.prototype.every()
TypedArray.prototype.filter()
Array.prototype.filter()
Promise.prototype.finally()
Array.prototype.find()
TypedArray.prototype.find()
Array.prototype.findIndex()
TypedArray.prototype.findIndex()
Map.prototype.forEach()
Array.prototype.forEach()
Set.prototype.forEach()
TypedArray.prototype.forEach()
Array.prototype.map()
TypedArray.prototype.map()
RegExp.prototype[@@replace]()
Array.prototype.reduce()
TypedArray.prototype.reduce()
TypedArray.prototype.reduceRight()
Array.prototype.reduceRight()
String.prototype.replace()
Array.prototype.some()
TypedArray.prototype.some()
TypedArray.prototype.sort()
Array.prototype.sort()
JSON.stringify()
Promise.prototype.then()
```