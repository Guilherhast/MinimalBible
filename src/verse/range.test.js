import test from 'node:test';
import assert from 'node:assert/strict';
import {Range} from './range.js';

test('Check empty', () => {
	console.clear();
	assert.equal(Range.fromArray(), '');
});
test('Reduce one verse', () => {
	console.clear();
	assert.equal(Range.fromArray([1]), '1');
	assert.equal(Range.fromArray([15]), '15');
});
test('Reduce sparce verses', () => {
	console.clear();
	assert.equal(Range.fromArray([1,5]), '1,5');
	assert.equal(Range.fromArray([10,15]), '10,15');
});
test('Reduce sequences', () => {
	console.clear();
	assert.equal(Range.fromArray([1,2]), '1-2');
	assert.equal(Range.fromArray([1,2,3]), '1-3');
	assert.equal(Range.fromArray([10,11]), '10-11');
	assert.equal(Range.fromArray([10,11,12]), '10-12');
	assert.equal(Range.fromArray([10,11,12,13]), '10-13');
});
test('Reduce multiple sequences', () => {
	console.clear();
	assert.equal(Range.fromArray([1,2,4,5]), '1-2,4-5');
	assert.equal(Range.fromArray([1,2,3,6,7,8]), '1-3,6-8');
	assert.equal(Range.fromArray([10,11,20,21]), '10-11,20-21');
	assert.equal(Range.fromArray([10,11,12, 21,22,23]), '10-12,21-23');
	assert.equal(Range.fromArray([10,11,12,13, 21,22,23,24]), '10-13,21-24');
});
test('Reduce sequences and sparce items', () => {
	console.clear();
	assert.equal(Range.fromArray([1,4,5]), '1,4-5');
	assert.equal(Range.fromArray([1,2,3,6,8]), '1-3,6,8');
	assert.equal(Range.fromArray([10,20,21]), '10,20-21');
	assert.equal(Range.fromArray([10,12,13,14,15,21,22,23]), '10,12-15,21-23');
	assert.equal(Range.fromArray([10,11,12,13,15,17,21,22,23,24]), '10-13,15,17,21-24');
});

