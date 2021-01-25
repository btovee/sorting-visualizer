// create max heap
function maxHeap(input, i, animations) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    let max = i

    if (left < arrLength && input[left] > input[max]) {
        max = left
    }

    if (right < arrLength && input[right] > input[max])     {
        max = right
    }

    if (max !== i) {
        swap(input, i, max, animations)
        maxHeap(input, max, animations)
    }
}

function swap(input, indexA, indexB, animations) {
    const temp = input[indexA]
    animations.push([indexA, indexB]);
    input[indexA] = input[indexB];
    animations.push([indexA, input[indexA]]);
    input[indexB] = temp;
    animations.push([indexB, temp]);
}

export function heapSort(input) {
    let animations = [];
    arrLength = input.length

    for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1)      {
        maxHeap(input, i, animations)
    }

    for (let j = input.length - 1; j > 0; j--) {
        swap(input, 0, j, animations)
        arrLength--

        maxHeap(input, 0, animations)
    }
    return animations;
}

let arrLength;
