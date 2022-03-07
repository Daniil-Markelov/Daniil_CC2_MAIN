let chart01;
let chart02;
let chart03;

var gui;
var gui1;
//chart01 gui
var myChartWidth1 = 400;
var myChartWidth1Min = 400;
var myChartWidth1Max = 550;

var myChartHeight1 = 400;
var myChartHeight1Min = 200;
var myChartHeight1Max = 200;

var mynumTicks1 = 10;
var mynumTicks1Min = 5;
var mynumTicks1Max = 20;

//chart03 gui
var myChartWidth3 = 400;
var myChartWidth3Min = 200;
var myChartWidth3Max = 200;

var myChartHeight3 = 400;
var myChartHeight3Min = 200;
var myChartHeight3Max = 200;

var mynumTicks3 = 10;
var mynumTicks3Min = 5;
var mynumTicks3Max = 20;




//var mybarWidth3 = ;
//var mybarWidth3Min = 20;
//var mybarWidth3Max = 30;



function setup() {


    createCanvas(1920, 1080);
    background(127);
    chart01 = new BarChart(datamonths);
    chart01.chartWidth = 500;
    chart01.chartHeight = 500;
    chart01.posX = 100;
    chart01.posY = 700;
    chart01.title = "American deaths from Corona Virus 2020-2022"
    chart01.numTicks = 10;
    chart01.updateValue();
    chart01.rotateLabels = true;
    chart01.showLabels = true;
    chart01.showValues = false;
    chart01.chartWidth = myChartWidth1;
    chart01.chartHeight = myChartHeight1;
    chart01.numTicks = mynumTicks1;
    //chart01.barWidth = mybarWidth1;

    chart02 = new BarChart2(dataire);
    chart02.chartWidth = 500;
    chart02.chartHeight = 300;
    chart02.posX = 550;
    chart02.posY = 0;
    chart02.title = "Irish Deaths from Corona Virus 2020-2022"
    chart02.numTicks = 13;
    chart02.updateValue();
    chart02.rotateLabels = false;
    chart02.showLabels = true;
    chart02.showValues = true;


    chart03 = new Stack(stackdata);
    chart03.title = "Percentage Vaccination Rate Comparison(As Of March 2022)"
    chart03.posX = 600;
    chart03.posY = 0;
    chart03.chartWidth = myChartWidth3;
    chart03.chartHeight = myChartHeight3;
    chart03.numTicks = mynumTicks3;
    //chart03.barWidth = mybarWidth3;
    chart03.updateValue();



    gui = createGui('Stacked Bar GUI');
    gui.addGlobals('myChartWidth3', 'myChartHeight3', 'mynumTicks3');
    gui.setPosition(1700, 50);
    gui1 = createGui('Bar Chart');
    gui1.addGlobals('myChartWidth1', 'myChartHeight1', 'mynumTicks1');
    gui1.setPosition(50, 50);



}



function draw() {
    chart01.chartWidth = myChartWidth1;
    chart01.chartHeight = myChartHeight1;
    chart01.numTicks = mynumTicks1;
    chart03.chartWidth = myChartWidth3;
    chart03.chartHeight = myChartHeight3;
    chart03.numTicks = mynumTicks3;
    //chart03.barWidth = mybarWidth3;

    background(0);
    textSize(30);
    text("Correlation between deaths and Vaccinations", 925, 100)
    chart01.render();
    chart01.updateValue();
    chart02.render();
    chart02.updateValue();
    chart03.render();
    chart03.updateValue();

}