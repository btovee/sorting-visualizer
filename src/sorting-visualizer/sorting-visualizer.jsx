import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {getMergeSortAnimations} from '../sorting-algorithms/merge-sort';
import './sorting-visualizer.css';
import {recursiveQuickSort} from "../sorting-algorithms/quick-sort";
import {heapSort} from "../sorting-algorithms/heap-sort";
import {bubbleSort} from "../sorting-algorithms/bubble-sort";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MEDIUM_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            array: [],
            animationSpeed: ANIMATION_SPEED_MEDIUM_MS
        };

    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({array});
    }

    animateSort(animations) {
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 === 0;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MEDIUM_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MEDIUM_MS);
            }
        }
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        this.animateSort(animations);
    }

    quickSort() {
        const animations = recursiveQuickSort(this.state.array);
        this.animateSort(animations);
    }

    heapSort() {
        const animations = heapSort(this.state.array);
        this.animateSort(animations);
    }

    bubbleSort() {
        const animations = bubbleSort(this.state.array);
        this.animateSort(animations);
    }

    // NOTE: This method will only work if your sorting algorithms actually return
    // the sorted arrays; if they return the animations (as they currently do), then
    // this method will be broken.
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        const {array} = this.state;

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className="item-spacing">
                        <Button variant="outlined" color="primary" onClick={() => this.resetArray()}>Generate New
                            Array</Button>
                        <Button variant="outlined" color="primary" onClick={() => this.mergeSort()}>Merge Sort</Button>
                        <Button variant="outlined" color="primary" onClick={() => this.quickSort()}>Quick Sort (needs
                            work)</Button>
                        <Button variant="outlined" color="primary" onClick={() => this.heapSort()}>Heap Sort</Button>
                        <Button variant="outlined" color="primary" onClick={() => this.bubbleSort()}>Bubble
                            Sort</Button>
                        <Button variant="outlined" color="primary" onClick={() => this.testSortingAlgorithms()}>
                            Test Sorting Algorithms (BROKEN)
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        {array.map((value, idx) => (
                            <div
                                className="array-bar"
                                key={idx}
                                style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`,
                                }}/>
                        ))}
                    </Paper>
                </Grid>

            </Grid>

        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}
