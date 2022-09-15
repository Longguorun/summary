const arr = [1, 2, 3, 4, 5];

const sum = arr.reduce((total, currentValue, currentIndex) => {
    total += currentValue;
    return total;
}, 0);

console.log(sum);

console.log(arr.filter(item => item === 4))