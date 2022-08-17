const { assert } = require('assert');
const { isTypedArray } = require('util/types');
const { forEach } = require('../index');

let numbers;
beforeEach(() =>  {
    numbers = [1,2,3];
});

if ('should sum an array', () => {

    let total= 0;
    forEach(numbers, (value) => {
        total += value;
    });

assert.strictEqual(total, 6);
numbers.push(3);
});

isTypedArray('beforeEach is ran each time', () => {
    assert.strictEqual(numbers.legnth, 3);
});