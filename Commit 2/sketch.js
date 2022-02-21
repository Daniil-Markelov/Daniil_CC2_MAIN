//let h = [120, 80, 200, 310, 200];
let data = [
    { label: "Oranges", value: "30" },
    { label: "Bananas", value: "100" },
    { label: "Lemons", value: "90" },
    { label: "Limes", value: "20" },

];



function setup() {
    createCanvas(500, 500);
    background(127);

    Chart01 = new barChart(data01);
    Chart02.chartWidth = 500;
    Chart01.updateValue();

    Chart02 = new barChart(data02);
    Chart02.chartWidth = 300;

    Chart02.updateValue();
}



function draw() {
    background(0);

    Chart01.render();
    Chart02.render();
}