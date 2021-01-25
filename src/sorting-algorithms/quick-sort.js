import {COLOUR_CHANGE, MOVE_ELEMENT} from "./constants";

export function recursiveQuickSort(arr) {
    const animations = [];
    if (arr.length <= 1) return arr;
    quickSort(arr, 0, arr.length - 1, animations)
    console.log(animations);
    return [animations, arr];
}


function quickSort(arr, start, end, animations) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }

    // Returns pivotIndex
    let index = partition(arr, start, end, animations);

    // Recursively apply the same logic to the left and right subarrays
    quickSort(arr, start, index - 1, animations);
    quickSort(arr, index + 1, end, animations);
}



function partition(arr, start, end, animations){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            // Swapping elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Change colour of switching elements
            animations.push([i, pivotIndex, COLOUR_CHANGE]);
            // Swapping elements in animation
            animations.push([i, arr[pivotIndex], MOVE_ELEMENT]);
            animations.push([pivotIndex, arr[i], MOVE_ELEMENT]);
            // Moving to next element
            pivotIndex++;
        }
    }

    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
    // Change color of switching elements
    animations.push([pivotIndex, end, COLOUR_CHANGE]);
    // Swapping elements in animation
    animations.push([pivotIndex, arr[end], MOVE_ELEMENT]);
    animations.push([end, arr[pivotIndex], MOVE_ELEMENT]);

    return pivotIndex;
}
