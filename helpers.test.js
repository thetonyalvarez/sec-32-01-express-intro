const { ExpressError } = require("./expressError");
const {
	validateQuery,
	findMean,
	findMedian,
	findMode,
	merge,
	mergeSort,
	createValueFreqObject,
} = require("./helpers");

describe("validate query", function () {
	test("should handle non-number values", function () {
		let num_1 = "1287479,22342,3524626277,foo";
		let num_2 = "[1,2,3],22342,3524626277,foo";
		let num_3 = [];
		expect(() => validateQuery(num_1)).toThrowError();
		expect(() => validateQuery(num_2)).toThrowError();
		expect(() => validateQuery(num_3)).toThrowError();
	});
});

describe("mean", function () {
	test("should calculate mean", function () {
		let num_2 = [1, 2, 3, 6];
		let num_3 = [1287479, 22342, 3524626277, 4275748646];
		let num_4 = [12.45, 7.2544, 2.33];
		expect(findMean(num_2)).toEqual(3);
		expect(findMean(num_3)).toEqual(1950421186);
		expect(findMean(num_4)).toBeCloseTo(7.3448);
	});
});

describe("median", function () {
	test("should create merge two sorted arrays", function () {
		expect(merge([1, 2, 2], [3, 4, 5])).toEqual([1, 2, 2, 3, 4, 5]);
	});

	test("should return a sorted array", function () {
		expect(mergeSort([1, 3, 2])).toEqual([1, 2, 3]);
		expect(
			mergeSort([
				76, 73, 95, 61, 90, 25, 65, 49, 73, 17, 68, 30, 32, 18, 39, 9,
				47, 9, 41, 25,
			])
		).toEqual([
			9, 9, 17, 18, 25, 25, 30, 32, 39, 41, 47, 49, 61, 65, 68, 73, 73,
			76, 90, 95,
		]);
	});

	test("should find the median in an array", function () {
		expect(findMedian([1, 3, 2])).toEqual(2);
		expect(
			findMedian([
				76, 73, 95, 61, 90, 25, 65, 49, 73, 17, 68, 30, 32, 18, 39, 9,
				47, 9, 41, 25,
			])
		).toEqual(44);
	});
});

describe("mode", function () {
	test("should return an object with frequency for each key", function () {
		let num_1 = [1, 2, 3, 3, 3, 3, 4, 5, 6];
		let num_2 = [7, 2, 5, 2, 76, 2, 5, 2, 22, 6, 8, 85, 2];

		expect(createValueFreqObject(num_1)).toEqual({
			1: 1,
			2: 1,
			3: 4,
			4: 1,
			5: 1,
			6: 1,
		});
		expect(createValueFreqObject(num_2)).toEqual(
			expect.objectContaining({
				2: 5,
			}),
			expect.objectContaining({
				5: 2,
			})
		);
	});

	test("should find mode of an array", function () {
		let num_1 = [1, 2, 3, 3, 3, 3, 4, 5, 6];
		let num_2 = [7, 2, 5, 2, 76, 2, 5, 2, 22, 6, 8, 85, 2];

		expect(findMode(num_1)).toEqual("3");
		expect(findMode(num_2)).toEqual("2");
	});

	test("should handle arrays with 2 values of equal frequency", function () {
		let num_1 = [7, 7, 7, 1, 4, 4, 4];
		let num_2 = [1, 2, 1, 2, 1, 2, 3];

		expect(findMode(num_1)).toEqual("4,7");
		expect(findMode(num_2)).toEqual("1,2");
	});
});
