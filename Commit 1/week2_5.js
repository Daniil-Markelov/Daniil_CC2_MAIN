let chartHeight = 400;
let h = [300,400,500,800, 600, 500, 200];
let scaledh = [];
let sortH = false;
let maxvalue;


let chartWidth = 400;
let marginX = 20;
let barspace = 5;
let remainingSpace = chartWidth - (marginX * 2) - (barspace * (h.length - 1));
let sortedh;
let barWidth = remainingSpace / h.length;
let colors;
let numticks = 10;
let ticklength = 10;
let tickinc = chartHeight / numticks;
let tick = chartHeight / numticks;
let textcen = (barWidth) + (barspace);

function setup() {
    createCanvas(500, 500)
    background(255)
    colors = [color('blue'), color('orange'), color('cyan'), color('red'), color('purple')];
    if (sortH == true) {
        sort(h);
    }
    maxvalue = max(h);
    for (let i = 0; i < h.length; i++) {
        let newValue = map(h[i], 0, maxvalue, 0, chartHeight)
        scaledh.push(newValue)
    }

}

function draw() {



    background(220);


    strokeWeight(3);
    stroke(80);

    translate(50, 450);
    textSize(12)
    textAlign(RIGHT, CENTER)
        //x axis
    line(0, 0, 400, 0);
    //y axis
    line(0, 0, 0, -400);

    //ticks
    stroke(139, 0, 0)
    strokeWeight(1)
    for (var i = 0; i <= numticks; i++) {
        line(0, -tick * i, -ticklength, -tick * i)
        text(i * tickinc, -15, i * -tick)
        push()
        translate(marginX+(barWidth-barspace*3),0)
        text(scaledh[i],i* textcen , -scaledh[i]-6)
        //scaledh.toFixed(0)
        //console.log("roundup")
        pop()
        
        
    }





    translate(marginX, 0)
    stroke(0)
    randomColor = colors[int(random(colors.length))]
    for (var i = 0; i < (h.length); i++) {
         fill([i % 3])//randomColor)
        rect(i * (barWidth + barspace), 0, barWidth, -scaledh[i]);
           
    }

}