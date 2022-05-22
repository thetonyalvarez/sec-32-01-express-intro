const { ExpressError } = require("./expressError");

const validateQuery = (array) => {
	// convert the query string into array by splitting by ','
	array = array.split(",");
	let cleanedArray = [];

	// Make sure the array has valid numbers and no strings.
	for (let item of array) {
		if (item === "")
			throw new ExpressError("Cannot contain empty items.", 404);
		if (isNaN(Number(item)))
			throw new ExpressError(`"${item}" is not a number.`, 404);
		cleanedArray.push(Number(item));
	}
	return cleanedArray;
};

const findMean = (array) => {
	let total = 0;
	for (let item of array) {
		total += Number(item);
	}
	return total / array.length;
};

const merge = (arr1, arr2) => {
	const results = [];
	let i = 0;
	let j = 0;
	while (i < arr1.length && j < arr2.length) {
		if (arr1[i] < arr2[j]) {
			results.push(arr1[i]);
			i++;
		} else {
			results.push(arr2[j]);
			j++;
		}
	}
	while (i < arr1.length) {
		results.push(arr1[i]);
		i++;
	}
	while (j < arr2.length) {
		results.push(arr2[j]);
		j++;
	}
	return results;
};

const mergeSort = (array) => {
	if (array.length <= 1) return array;
	const mid = Math.floor(array.length / 2);
	const left = mergeSort(array.slice(0, mid));
	const right = mergeSort(array.slice(mid));
	return merge(left, right);
};

const findMedian = (array) => {
	let sortedArray = mergeSort(array);
	let mid = Math.floor(sortedArray.length / 2);
	if (sortedArray.length % 2 == 0) {
		return (sortedArray[mid] + sortedArray[mid - 1]) / 2;
	} else {
		return sortedArray[mid];
	}
};

const createValueFreqObject = (array) => {
	let object = {};

	for (let item in array) {
		if (object[array[item]]) {
			object[array[item]]++;
		} else {
			object[array[item]] = 1;
		}
	}
	return object;
};

const findMode = (array) => {
	let freqObject = createValueFreqObject(array);
	let mostFrequent = 0;
	let mostFrequentKeys = new Set();

	Object.keys(freqObject).forEach((key) => {
		let val = freqObject[key];
		if (val > mostFrequent) {
			mostFrequent = val;
		}
	});

	Object.keys(freqObject).forEach((key) => {
		let val = freqObject[key];
		if (val == mostFrequent) {
			mostFrequentKeys.add(key);
		}
	});

	return Array.from(mostFrequentKeys).join(",");
};

module.exports = {
	validateQuery,
	findMean,
	findMedian,
	findMode,
	merge,
	mergeSort,
	createValueFreqObject,
};
