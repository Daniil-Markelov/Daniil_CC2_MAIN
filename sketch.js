
//let data = [120, 80, 200, 310, 200];
let data = [
    { value: 32, label: "Oranges" },
    { value: 22, label: "Apples" },
    { value: 43, label: "Bananas" },
    { value: 16, label: "Pears" }
];


let maxValue;
let posX = 50;
let posY = 450;
let showLabels = true;
let rotateLabels = true;
let showValues = true;

let sortData = true;
let sortedData;
let colors;
let margin = 30;
let spacing = 15;
let chartWidth = 400;
let chartHeight = 400;
let remainingSpace = chartHeight - (margin * 2) - (spacing * (data.length - 1));
let barWidth = remainingSpace / data.length;

//ticks
let numTicks = 10;
let tickLength = 5;
let tickSpace = chartHeight / numTicks;
let tickIncrement;


function setup() {
    createCanvas(500, 500);
    background(0);
    colors = [color('#F3646A'), color('#F68F6A'), color('#FAB666'), color('#FFE066')];
     if (sortData == true) {
         sort(data)
     }

    let listValues = data.map(function(x) { return x.value });
    maxValue = max(listValues);

    tickIncrement = int(maxValue / numTicks);


}

function draw() {
    background(50);
    push();
    translate(posX, 450);
    drawTicks();
    pop();

    push();
    translate(posX, posX + margin);
    drawBars();
    pop();

    push();
    translate(posX, posY);
    translate(0, 0);
    drawAxis();
    pop();
    fill(255);
    textSize(32);
    textAlign(CENTER, TOP);
    text("Amount of fruit sold in 24hrs", width / 2, 20);

}

function drawAxis() {
    //y Axis
    strokeWeight(1);
    stroke(255);
    line(0, 0, 0, -chartWidth);
    //x Axis
    strokeWeight(1);
    stroke(255);
    line(0, 0, chartWidth, 0);
}

function scaledData(_num) {
    let newValue = map(_num, 0, maxValue, 0, chartHeight);
    return newValue;
}

function drawBars() {
    for (let i = 0; i < data.length; i++) {
        fill(colors[i % colors.length]);
        strokeWeight(0);
        rect(0, i * (barWidth + spacing), -scaledData(-data[i].value), barWidth);

        if (showValues) {
            noStroke();
            fill(255);
            textSize(12);
            textAlign(LEFT, TOP);
            text(data[i].value, scaledData(data[i].value) + 5, i * (barWidth + spacing) + barWidth / 2);
        }

        if (showLabels) {
            if (rotateLabels) {
                push();
                noStroke();
                fill(255);
                textSize(12);
                textAlign(CENTER, BOTTOM);
                translate(-20, ((barWidth + spacing) * i) + barWidth / 2);
                rotate(PI / 2);
                text(data[i].label, 0, 0);
                pop();
            } else {

                noStroke();
                fill(255);
                textSize(12);
                textAlign(RIGHT, BOTTOM);
                text(data[i].label, 0, i * (barWidth + spacing) + barWidth / 2);
            }
        }

    }
}

function drawTicks() {
    textSize(12);
    textAlign(CENTER, CENTER);
    for (let i = 0; i <= numTicks; i++) {
        stroke(255, 100);
        strokeWeight(2);
        line(i * tickSpace, 0, i * tickSpace, -tickLength);

        stroke(255, 40);
        strokeWeight(1);
        line(i * tickSpace, 0, i * tickSpace, -chartHeight);

        noStroke();
        fill(255, 100);
        text(i * tickIncrement, i * tickSpace, 10);
    }
}