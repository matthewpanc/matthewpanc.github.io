/**
 * I created a set of functions which are then called in a certain order in setup
 */

var graphTimeline = [];
var width;
var height;
const canvasPosition = {

    x:0,
    y:0

}
var scalar;
var stepNumber = 0;
var amount;

/**
 * Class used  to define Bar objects in the bar graph
 * @param {Number} value the random number value of the bar 
 * @param {Number} index the bars index in the array
 */
class Bar{

    constructor(value, index){

        this.value = value,
        this.index = index,
        this.restingColor = {
            r:map(value, 0, scalar, 0, 200),
            g:map(value, 0, scalar, 200, 0),
            b:map(value, 0, scalar, 0, 100),
        },
        this.currentColor = {
            r:this.restingColor.r,
            g:this.restingColor.g,
            b:this.restingColor.b,
        }
    }

    SetColor(r,g,b){ //sets the current color to a given 

        this.currentColor.r = r;
        this.currentColor.g = g;
        this.currentColor.b = b;

    }

    ResetColor(){

        this.currentColor.r = this.restingColor.r;
        this.currentColor.g = this.restingColor.g;
        this.currentColor.b = this.restingColor.b;

    }


}

/**
 * Gets a certain amount of random integers based on a certian scale
 * @param {Number} scalar scales the decimals to certain values ex. 0.1 * 100 = 10
 * @param {Number} amount the amount of numbers you want 
 */
function GetRandomNumbers(scalar, amount){

    let nums = [];

    for(let i = 0; i < amount; i++){

        nums.push(Math.round(Math.random() * scalar)); //get a random number between 0 and 1, multiply it by a scalar and then round the output

    }

    return nums;

}

/**
 * creates a bar chart based on the values inputed
 * @param {Number[]} values the values that are being graphed 
 */
function MakeGraph(values){

    let graph = [];
    let bar;

    for(let i = 0; i < values.length; i++){ //for every number

        bar = new Bar(values[i], i); //make a new bar object using it's value and index
        graph.push(bar); //add it to the graph

    }

    return graph;

}

/**
 * draws out a given bar graph
 * @param {Bar[]} graph the bar graph that is being drawn
 */
function DrawGraph(graph){

    background(0);

    var bar;
    var spacing = width/graph.length; //defines spacing, width, etc.

    for(let i = 0; i < graph.length; i++){ //for every bar in the graph

        bar = graph[i] //current bar object being drawn
        
        fill(bar.currentColor.r, bar.currentColor.g, bar.currentColor.b); //set the fill to the bar's current color

        rect(i * spacing, height - bar.value, spacing, bar.value); //rectangle representing the bar

        //text(bar.value, 5 + i + i * spacing, 390 - bar.value, spacing/2 + 5); //text to show the bar's value

    }

}

function KeyCurrent(nums, key, current){

    let numbers = nums;
    let graph = MakeGraph(numbers);
    
    if(key != undefined){

        graph[key].SetColor(255, 0, 0);
        
    }

    if(current != undefined){

        graph[current].SetColor(255, 165, 20);
        
    }

    graphTimeline.push(graph);

}

function Swap(nums, s1, s2){

    let numbers = nums;
    let graph = MakeGraph(numbers);

    graph[s1].SetColor(0, 200, 200);
    graph[s2].SetColor(0, 200, 200);

    graphTimeline.push(graph);

}

function Shift(nums, s1, s2){

    let numbers = nums;
    let graph = MakeGraph(numbers);

    graph[s1].SetColor(255, 255, 255);
    graph[s2].SetColor(255, 255, 255);

    graphTimeline.push(graph)

}

function Insert(nums, index){

    let numbers = nums;
    let graph = MakeGraph(numbers);

    graph[index].SetColor(20,255,255);

    graphTimeline.push(graph)

}

function Done(nums){

    let numbers = nums;
    let graph = MakeGraph(numbers);

    SetAllBars(graph, 0, 255, 0);

    graphTimeline.push(graph)

}

/**
 * sorts a set of values using a insertion sort algorithm it also keeps track of the steps taken to sort them
 * @param {Number[]} values values to be sorted
 */
function SelectionSort(values){

    graphTimeline.push(MakeGraph(values));

    let minValueIndex;
    let swapping;

    for(let i = 0; i < values.length - 1; i++){

        minValueIndex = i;

        for(let j = i + 1; j < values.length; j++){

            KeyCurrent(values, minValueIndex, j);

            if(values[j] < values[minValueIndex]){

                minValueIndex = j;

            }

        }

        swapping = values[i];
        values[i] = values[minValueIndex];
        values[minValueIndex] = swapping;

        Swap(values, minValueIndex, i);

    }

    Done(values);

    return graphTimeline;

}

/**
 * Resets the color of every bar in a specified graph
 * @param {Bar[]} graph the graph which is getting it's color's reset 
 */
function ResetBars(graph){
        
    for(let i = 0; i < graph.length; i++){ //for every bar
        
        graph[i].ResetColor();

    }

}

/**
 * sets the color of every single bar in the graph to a certain value
 * @param {Bar[]} graph the graph that will have it's color set
 * @param {Number} r the red value
 * @param {Number} g the green value
 * @param {Number} b the blue value
 */
function SetAllBars(graph, r, g, b){

    for(let i = 0; i < graph.length; i++){

        graph[i].SetColor(r, g, b);

    }

}

function MakeButton(label, _class, x, y){

    let button = createButton(label);
    button.class(_class);
    button.position(x, y);

    return button;

}

function setup(){

    width = 1340;
    height = 400;
    scalar = height - 100;
    amount = width / 15;

    canvasPosition.x = windowWidth / 2 - width / 2;
    canvasPosition.y = 200;

    canvas = createCanvas(width, height);
    canvas.style("position", "absolute");
    canvas.style("top", `${canvasPosition.y}px`);
    canvas.style("left", `5%`);
    background(0);
    rectMode(CORNER)
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);
    noLoop();

    fill(255);

}

function mouseClicked(){

    fill(0);
    rect(290, 10, 50, 20);
    fill(255);
    text(`${stepNumber + 1} / ${graphTimeline.length}`, 7 * nextButton.width + 10, 20);

}

function draw(){

    numbers = GetRandomNumbers(scalar, amount); //get the numbers
    graphTimeline = SelectionSort(numbers); //sort the graph and record the steps taken
    DrawGraph(graphTimeline[0]);

    nextButton = MakeButton("Next", "NiceButton", canvasPosition.x + 10, canvasPosition.y + 10);
    skip10 = MakeButton("Skip10", "NiceButton", canvasPosition.x + 2 * nextButton.width + 10, canvasPosition.y + 10);
    skip100 = MakeButton("Skip100", "NiceButton", canvasPosition.x + 10 + 4 * nextButton.width, canvasPosition.y + 10);

    backButton = MakeButton("Back", "NiceButton", canvasPosition.x + 10, canvasPosition.y + nextButton.height + 15);
    back10 = MakeButton("Back10", "NiceButton", canvasPosition.x + 2 * nextButton.width + 10, canvasPosition.y + nextButton.height + 15);
    back100 = MakeButton("Back100", "NiceButton", canvasPosition.x + 10 + 4 * nextButton.width, canvasPosition.y + nextButton.height + 15);

    fill(255);
    text(`${stepNumber + 1} / ${graphTimeline.length}`, 7 * nextButton.width + 10, 20);

    nextButton.mousePressed(() =>{

        if(stepNumber != graphTimeline.length - 1){

            stepNumber++;
            DrawGraph(graphTimeline[stepNumber]);    

        }

    });
    skip10.mousePressed(() => {

        stepNumber += 10;

        if(stepNumber > graphTimeline.length - 1){

            stepNumber = graphTimeline.length - 1;

        }

        DrawGraph(graphTimeline[stepNumber]);

    });
    skip100.mousePressed(() => {

        stepNumber += 100;

        if(stepNumber > graphTimeline.length - 1){

            stepNumber = graphTimeline.length - 1;

        }

        DrawGraph(graphTimeline[stepNumber]);

    });
    backButton.mousePressed(() =>{

        if(stepNumber != 0){

            stepNumber--;
            DrawGraph(graphTimeline[stepNumber]);    

        }

    });
    back10.mousePressed(() => {

        stepNumber -= 10;

        if(stepNumber < 0){

            stepNumber = 0;

        }

        DrawGraph(graphTimeline[stepNumber]);

    });
    back100.mousePressed(() => {

        stepNumber -= 100;

        if(stepNumber < 0){

            stepNumber = 0;

        }

        DrawGraph(graphTimeline[stepNumber]);

    });

}