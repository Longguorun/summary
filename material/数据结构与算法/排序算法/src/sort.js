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

//1.冒泡排序
const bublbeSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                const tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
        }
    }
    return array;
}
console.log("冒泡排序后的数组是：" + bublbeSort(copyArray()));

//2.选择排序
const selectionSort = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
        let minNum = array[i];
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < minNum) {
                minIndex = j;
                minNum = array[j];
            }
        }
        const tmp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = tmp;
    }
    return array;
}
console.log("选择排序后的数组是：" + selectionSort(copyArray()));

//3.插入排序
const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
        let startIndex = i - 1;
        while (startIndex >= 0) {
            if (array[startIndex + 1] < array[startIndex]) {
                const tmp = array[startIndex + 1];
                array[startIndex + 1] = array[startIndex];
                array[startIndex] = tmp;
            }
            else {
                break;
            }
            startIndex--;
        }
    }
    return array;
}
console.log("插入排序后的数组是：" + insertionSort(copyArray()));

//4.快速排序
const quiceSort = (array) => {
    if (array.length === 0) {
        return []
    }
    else if (array.length === 1) {
        return array;
    }
    else {
        const pivot = array[0];
        const leftArr = [], rightArr = [];
        for (let i = 1; i < array.length; i++) {
            if (array[i] < pivot) {
                leftArr.push(array[i]);
            }
            else {
                rightArr.push(array[i]);
            }
        }
        return [...quiceSort(leftArr), pivot, ...quiceSort(rightArr)];
    }
}
console.log("快速排序后的数组是：" + quiceSort(copyArray()));
//另一种实现
const quickSort = (array) => {
    const arr = array;
    const swap = (arr, index1, index2) => {
        const tmp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = tmp;
    }

    const partition = (arr, start, end) => {
        let p1 = start - 1;
        const pviotValue = arr[end];
        let p2 = start;
        for (; p2 < end; p2++) {
            if (arr[p2] < pviotValue) {
                p1++;
                swap(arr, p1, p2);
            }
        }
        p1++;
        swap(arr, end, p1);
        return p1;
    }

    const sort = (arr, start, end) => {
        if (end > start) {
            const pivot = partition(arr, start, end);
            sort(arr, start, pivot - 1);
            sort(arr, pivot + 1, end);
        }
    }

    sort(arr, 0, arr.length - 1);
    return arr;
}
console.log("指针法快速排序：" + quickSort(copyArray()));

//5.希尔排序(插入排序的进阶版)
const shellSort = (array) => {
    for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < array.length; i = i + gap) {
            let startIndex = i - gap;
            while (startIndex >= 0) {
                if (array[startIndex + gap] < array[startIndex]) {
                    const tmp = array[startIndex + gap];
                    array[startIndex + gap] = array[startIndex];
                    array[startIndex] = tmp;
                }
                else {
                    break;
                }
                startIndex--;
            }
        }
    }
    return array;
}

console.log("希尔排序后的数组是：" + shellSort(copyArray()));

//6.归并排序
const mergeSort = (array) => {
    const merge = (array) => {
        if (array.length < 2) {
            return array;
        }
        else {
            const leftArr = array.slice(0, Math.floor(array.length / 2));
            const rightArr = array.slice(Math.floor(array.length / 2));
            return [...sort(merge(leftArr), merge(rightArr))];
        }
    };
    const sort = (left, right) => {
        const returnArray = [];
        const maxNum = left.length + right.length;
        left.push(Infinity);
        right.push(Infinity);
        while (returnArray.length < maxNum) {
            if (left[0] < right[0]) {
                returnArray.push(left.shift());
            }
            else {
                returnArray.push(right.shift());
            }
        }
        return returnArray;
    }
    return merge(array);
}
console.log("归并排序后的数组是：" + mergeSort(copyArray()));
//另一种实现
const mergeSort2 = (array) => {
    let array1 = array;
    let array2 = [];
    for (let seg = 1; seg < array1.length; seg = seg * 2) {
        for (let start = 0; start + seg < array1.length; start += seg * 2) {
            const mid = Math.min(start + seg, array1.length);
            const end = Math.min(start + 2 * seg, array1.length);
            let i = start, j = mid, k = start;
            while (i < mid || j < end) {
                if (j === end || (i < mid && array1[i] < array1[j])) {
                    array2[k++] = array1[i++];
                }
                else {
                    array2[k++] = array1[j++]
                }
            }
        }
        const tmp = array1;
        array1 = array2;
        array2 = tmp;
    }
    return array1;
}
console.log("新的归并算法排序：" + mergeSort2(copyArray()));

//7.堆排序(主要是实现这个堆的数据类型)
import { MaxHeap } from "./maxHeap.js";
const heapSort = (array) => {
    const heap = new MaxHeap();
    for (let i = 0; i < array.length; i++) {
        heap.insert(array[i]);
    }
    const sortedArr = [];
    while (heap.size() > 0) {
        sortedArr.push(heap.pop());
    }
    return sortedArr;
}
console.log("堆排序后的数组是：" + heapSort(copyArray()).reverse());

//8.计数排序
const countingSort = (array) => {
    let min = 0, max = 0;
    let minNum = array[0], maxNum = array[0];
    const count = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] > maxNum) {
            max = i;
            maxNum = array[i];
        }
        if (array[i] < minNum) {
            min = i;
            minNum = array[i];
        }
        if (count[array[i]] !== undefined) {
            count[array[i]]++;
        }
        else {
            count[array[i]] = 1;
        }
    }
    const returnArray = [];
    for (let i = minNum; i <= maxNum; i++) {
        if (count[i] !== undefined) {
            while (count[i] > 0) {
                returnArray.push(i);
                count[i]--;
            }
        }
    }
    return returnArray;
}
console.log("计数排序后的数组是：" + countingSort(copyArray()));

//9.桶排序（分散后使用其他排序）
const bucketSort = (array) => {
    let min = array[0], max = array[0];
    const BUCKET_SIZE = 10;
    const bucketArray = [];
    array.forEach((item) => {
        if (item < min) {
            min = item;
        }
        if (item > max) {
            max = item;
        }
    });
    let bucketCount = 0;
    for (let i = 0; i < Math.floor((max - min) / BUCKET_SIZE) + 1; i++) {
        bucketArray[i] = [];
        bucketCount = i;
    }
    for (let i = 0; i < array.length; i++) {
        bucketArray[Math.floor((array[i] - min) / BUCKET_SIZE)].push(array[i]);
    }
    let returnArray = [];
    for (let i = 0; i < bucketCount + 1; i++) {
        returnArray = [...returnArray, ...insertionSort(bucketArray[i])]
    }
    return returnArray;
}
console.log("桶排序后的数组是：" + bucketSort(copyArray()));

//10.基数排序
const radixSort = (array) => {
    let maxIndex = 0, maxNum = array[0];
    const radixArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] > maxNum) {
            maxIndex = i;
            maxNum = array[i];
        }
    };
    for (let i = 0; i < 10; i++) {
        radixArray[i] = [];
    }
    let base = 1;
    while (parseInt(maxNum / base) > 0) {
        for (let j = 0; j < array.length; j++) {
            radixArray[parseInt(array[j] / base) % 10].push(array[j]);
        }
        array = [];
        for (let i = 0; i < radixArray.length; i++) {
            while (radixArray[i].length > 0) {
                array.push(radixArray[i].shift());
            }
        }
        base *= 10;
    }
    return array;
}
console.log("基数排序后的数组是：" + radixSort(copyArray()));