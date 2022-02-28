class BarChart {
    constructor(_data) {

        this.data = _data;

        this.chartWidth = 100;
        this.chartHeight = 300;

        this.posX = 50;
        this.posY = 450;

        this.spacing = 5;
        this.margin = 30;
        this.numTicks = 10;
        this.tickSpacing;
        this.barWidth;
        this.remainder;

        this.tickIncrements;
        this.maxValue;
        this.title = "Sales OF Fruit"

        this.colors = [
            color('red'),
            color('green'),
            color('blue'),
            color('orange')
        ];

        this.showValues = true;
        this.showLabels = true;
        this.rotateLabels = false;


        this.updateValue();
    }

    updateValue() {
        this.tickSpacing = this.chartHeight / this.numTicks;
        this.remainder = this.chartWidth - (this.margin * 2) - (this.spacing * (this.data.length - 1));
        this.barWidth = this.remainder / this.data.length;

        let listValues = this.data.map(function(x) { return x.value })
        this.maxValue = max(listValues);
        this.tickIncrements = this.maxValue / this.numTicks;
    }

    render() {
        translate(this.posX, this.posY);



        this.drawAxis();
        this.drawTickLines();
        this.drawLines();
        this.drawRects();
    }


    scaledData(num) {
        return map(num, 0, this.maxValue, 0, this.chartHeight);
    }

    drawTitle() {
        textAlign(CENTER, CENTER);
        text(this.title, (this.chartHeight / 2), -(this.chartHeight + this.margin));
    };

    drawTickLines() {
        for (let i = 0; i <= this.numTicks; i++) {
            //ticks
            stroke(255);
            line(0, this.tickSpacing * -i, -10, this.tickSpacing * -i);

            //numbers (text)
            fill(255, 200);
            noStroke();
            textSize(14);
            textAlign(RIGHT, CENTER);
            text((i * this.tickIncrements).toFixed(1), -15, this.tickSpacing * -i);
        }
    }

    drawLines() {
        for (let i = 0; i <= this.numTicks; i++) {
            //horizontal line
            stroke(255, 100);
            line(0, this.tickSpacing * -i, this.chartWidth, this.tickSpacing * -i);

        }
    }

    drawAxis() {
        //y Axis
        strokeWeight(1);
        stroke(255);
        line(0, 0, 0, -this.chartHeight);
        //x Axis
        strokeWeight(1);
        stroke(255);
        line(0, 0, this.chartWidth, 0);
    }

    drawRects() {

        translate(this.margin, 0);
        push();
        for (let i = 0; i < this.data.length; i++) {
            let colorNum = i % 4;

            //bars
            fill(this.colors[colorNum]);
            noStroke();
            rect((this.barWidth + this.spacing) * i, 0, this.barWidth, this.scaledData(-this.data[i].value));

            //numbers (text)
            if (this.showValues) {
                noStroke();
                fill(255);
                textSize(16);
                textAlign(CENTER, BOTTOM);
                text(this.data[i].value, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, this.scaledData(-this.data[i].value));
            }


            //text
            if (this.showLabels) {
                if (this.rotateLabels) {
                    push();
                    noStroke();
                    fill(255);
                    textSize(14);
                    textAlign(CENTER, BOTTOM);
                    translate(((this.barWidth + this.spacing) * i) + this.barWidth / 2, 10)
                    rotate(PI / 2);
                    text(this.data[i].label, 0, 0);
                    pop();
                } else {
                    push();
                    noStroke();
                    fill(255);
                    textSize(14);
                    textAlign(CENTER, BOTTOM);
                    text(this.data[i].label, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, 20);
                    pop();
                }
            }
        }
        pop();
    }
}