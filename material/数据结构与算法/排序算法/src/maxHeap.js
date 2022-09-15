export class MaxHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return (index - 1) >> 1;
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        const tmp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = tmp;
    }

    shiftUp(index) {
        if (index == 0) { return; }
        const parentIndex = this.getParentIndex(index);
        if (this.heap[index] > this.heap[parentIndex]) {
            this.swap(index, parentIndex);
            this.shiftUp(parentIndex);
        }
    }

    shiftDown(index) {
        const leftIndex = this.getLeftChildIndex(index);
        const rightIndex = this.getRightChildIndex(index);
        if ((this.heap[index] < this.heap[leftIndex]) || (this.heap[index] < this.heap[rightIndex])) {
            if (this.heap[leftIndex] < this.heap[rightIndex]) {
                this.swap(index, rightIndex);
                this.shiftDown(rightIndex);
            }
            else {
                this.swap(index, leftIndex);
                this.shiftDown(leftIndex);
            }
        }
    }

    insert(item) {
        this.heap.push(item);
        this.shiftUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        else {
            let returnData = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.shiftDown(0);
            return returnData;
        }
    }

    peek() {
        return this.heap[0];
    }

    console() {
        return this.heap;
    }

    size() {
        return this.heap.length;
    }
}
