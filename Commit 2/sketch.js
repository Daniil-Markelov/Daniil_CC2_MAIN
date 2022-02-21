//let h = [120, 80, 200, 310, 200];
let data = [
    { label: "Oranges", value: "30" },
    { label: "Bananas", value: "100" },
    { label: "Lemons", value: "90" },
    { label: "Limes", value: "20" },

];

let chart01;

function setup() {
    createCanvas(1000, 1000);
    background(127);
    chart01 = new BarChart(data);
    chart01.chartWidth = 300;

}



function draw() {
    background(0);

    chart01.render();
    chart01.updateValue();

}