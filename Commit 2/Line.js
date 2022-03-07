class BarChart2 {
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
        this.title = "";
        this.color =

            //this.colors = [
            // color('purple'),
            // color('green'),
            //  color('blue'),
            // color('orange')
            //];

            this.showValues = true;
        this.showLabels = true;
        this.rotateLabels = false;
        this.valuetext = 3;
        this.titleoffset = 10;


        this.updateValue();
    }

    updateValue() {
        this.tickSpacing = this.chartHeight / this.numTicks;
        this.remainder = this.chartWidth - (this.margin * 2) - (this.spacing * (this.data.length - 1));
        this.barWidth = this.remainder / this.data.length;

        let listValues = this.data.map(function(x) { return x.Deaths })
        this.maxValue = max(listValues);
        this.tickIncrements = this.maxValue / this.numTicks;
    }

    render() {
        translate(this.posX, this.posY);



        this.drawAxis();
        this.drawTickLines();
        this.drawLines();
        this.drawRects();
        this.drawTitle();
    }


    scaledData(num) {
        return map(num, 0, this.maxValue, 0, this.chartHeight);
    }

    drawTitle() {
        textAlign(CENTER, CENTER);
        text(this.title, (this.chartHeight / 1.5), -(this.chartHeight + this.margin));
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
            text((i * this.tickIncrements).toFixed(0), -15, this.tickSpacing * -i);
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
            //let colorNum = i % 4;

            //bars
            //fill(this.colors[colorNum]);
            fill(255, 0, 0, 0)
            noStroke();
            rect((this.barWidth + this.spacing) * i, 0, this.barWidth, this.scaledData(-this.data[i].Deaths));

            //numbers (text)
            if (this.showValues) {
                noStroke();
                fill(255);
                textSize(3);
                textStyle(BOLD);
                textAlign(CENTER, BOTTOM);
                text(this.data[i].Deaths, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, this.scaledData(-this.data[i].Deaths));

            }


            //text
            if (this.showLabels) {

                push();
                noStroke();
                fill(200);
                textSize(20);
                textAlign(CENTER, BOTTOM);
                text("T I M E(2020 - 2022)", (this.chartWidth / 2.5), 30);
                pop();
            }

        }
        pop();
    }
}