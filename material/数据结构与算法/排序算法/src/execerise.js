const createRandomArray = () => {
    const count = 10;
    const numArr = [];
    for (let i = 0; i < count; i++) {
        numArr.push(Math.ceil((Math.random() * 100)));
    }
    return numArr;
}
const originalArray = createRandomArray();
const copyArray = () => {
    return JSON.parse(JSON.stringify(originalArray))
}
console.log("源数组是" + originalArray);

function swap(array, index1, index2) {
    const tmp = array[index1];
    array[index1] = array[index2];
    array[index2] = tmp;
}


function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                swap(array, i, j);
            }
        }
    }
    return array;
}
console.log("bubbleSort：" + bubbleSort(copyArray()));

function quiceSort(array) {
    function sort(sortedArray) {
        if (sortedArray.length === 0) {
            return [];
        }
        else if (sortedArray.length === 1) {
            return sortedArray;
        }
        else {
            const pivot = sortedArray[0];
            const leftArray = [], rightArray = [];
            for (let i = 1; i < sortedArray.length; i++) {
                if (sortedArray[i] > pivot) {
                    rightArray.push(sortedArray[i]);
                }
                else {
                    leftArray.push(sortedArray[i]);
                }
            }
            return [...sort(leftArray), pivot, ...sort(rightArray)];
        }
    }
    return sort(array);
}
console.log("quickSort: " + quiceSort(copyArray()));

function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let startIndex = i - 1;
        while (startIndex >= 0) {
            if (array[startIndex + 1] < array[startIndex]) {
                swap(array, startIndex + 1, startIndex);
            }
            else {
                break;
            }
            startIndex--;
        }
    }
    return array;
}
console.log("insertionSort: " + insertionSort(copyArray()));

function shellSort(array) {
    for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < array.length; i++) {
            if (array[i - gap] > array[i]) {
                swap(array, i - gap, i);
            }
        }
    }
    return array;
}
console.log("shellSort: " + shellSort(copyArray()));

function selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[i]) {
                swap(array, i, j);
            }
        }
    }
    return array;
}
console.log("selectionSort: " + selectionSort(copyArray()));

function heapSort() {

}

function mergeSort(array) {
    function merge(mergedArray) {
        if (mergedArray.length > 1) {
            const leftArray = mergedArray.slice(0, Math.floor(mergedArray.length / 2));
            const rightArray = mergedArray.slice(Math.floor(mergedArray.length / 2));
            return [...sort(merge(leftArray), merge(rightArray))];
        }
        else if (mergedArray.length === 1) {
            return mergedArray;
        }
        else {
            return [];
        }
    };

    function sort(leftArray, rightArray) {
        let sumLength = leftArray.length + rightArray.length;
        leftArray.push(Infinity);
        rightArray.push(Infinity);
        const returnArray = [];
        while (sumLength > 0) {
            if (leftArray[0] < rightArray[0]) {
                returnArray.push(leftArray.shift());
            }
            else {
                returnArray.push(rightArray.shift());
            }
            sumLength--;
        }
        return returnArray;
    };

    return merge(array);
}
console.log("mergeSort: " + mergeSort(copyArray()));

function countingSort(array) {
    const minNum = Math.min(...array);
    const maxNum = Math.max(...array);
    const countArray = [], returnArray = [];
    for (let i = 0; i < array.length; i++) {
        if (countArray[array[i]] !== undefined) {
            countArray[array[i]]++;
        }
        else {
            countArray[array[i]] = 1;
        }
    }
    for (let i = minNum; i <= maxNum; i++) {
        if (countArray[i] !== undefined) {
            while (countArray[i] > 0) {
                returnArray.push(i);
                countArray[i]--;
            }
        }
    }
    return returnArray;
}
console.log("countingSort: " + countingSort(copyArray()));

function bucketSort(array) {
    const minNum = Math.min(...array);
    const maxNum = Math.max(...array);
    const BUCKET_NUM = 10;
    const bucketArray = [];

    for (let i = 0; i < Math.floor((maxNum - minNum) / BUCKET_NUM) + 1; i++) {
        bucketArray[i] = [];
    }

    for (let i = 0; i < array.length; i++) {
        bucketArray[Math.floor((array[i] - minNum) / BUCKET_NUM)].push(array[i]);
    }

    const returnArray = [];
    for (let i = 0; i < bucketArray.length; i++) {
        returnArray = [...returnArray, insertionSort(bucketArray[i])];
    }

    return returnArray;
}
console.log("bucketSort: " + bubbleSort(copyArray()));

function radixSort(array) {
    const maxNum = Math.max(...array);
    let count = 1;
    const radixArray = [];

    for (let i = 0; i < 10; i++) {
        radixArray[i] = [];
    }
    while (Math.floor(maxNum / count)) {
        for (let i = 0; i < array.length; i++) {
            radixArray[Math.floor(array[i] / count) % 10].push(array[i]);
        }
        array = [];
        for (let i = 0; i < radixArray.length; i++) {
            while (radixArray[i].length > 0) {
                array.push(radixArray[i].shift());
            }
        }
        count *= 10;
    }
    return array;
}
console.log("radixSort: " + radixSort(copyArray()));