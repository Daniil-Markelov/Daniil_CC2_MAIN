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
        this.title = "";

        this.colors = [
            color('#67001f'),
            color('#67001f'),
            color('#67001f'),
            color('#b2182b'),
            color('#b2182b'),
            color('#b2182b'),
            color('#d6604d'),
            color('#d6604d'),
            color('#f4a582'),
            color('#f4a582'),
            color('#fddbc7'),
            color('#fddbc7'),
            color('#f7f7f7'),
            color('#f7f7f7'),
            color('#d1e5f0'),
            color('#d1e5f0'),
            color('#92c5de'),
            color('#92c5de'),
            color('#4393c3'),
            color('#4393c3'),
            color('#2166ac'),
            color('#2166ac'),
            color('#053061'),
            color('#053061'),
            color('#053061'),
        ];

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

        let listValues = this.data.map(function(x) { return x.deaths })
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
        text(this.title, (this.chartWidth / 2), -(this.chartHeight + this.margin));
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
            let colorNum = i % 24;

            //bars
            fill(this.colors[colorNum]);
            noStroke();
            rect((this.barWidth + this.spacing) * i, 0, this.barWidth, this.scaledData(-this.data[i].deaths));

            //numbers (text)
            if (this.showValues) {
                noStroke();
                fill(255);
                textSize(3);
                textAlign(CENTER, BOTTOM);
                text(this.data[i].deaths, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, this.scaledData(-this.data[i].deaths));
            }


            //text
            if (this.showLabels) {
                if (this.rotateLabels) {
                    push();
                    noStroke();
                    fill(255);
                    textSize(12);
                    textAlign(CENTER, BOTTOM);
                    translate(((this.barWidth + this.spacing) * i - 5) + this.barWidth / 2, 20)
                    rotate(PI / 2);
                    text(this.data[i].date, 0, 0);
                    pop();
                } else {
                    push();
                    noStroke();
                    fill(255);
                    textSize(14);
                    textAlign(CENTER, BOTTOM);
                    text(this.data[i].date, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, 20);
                    pop();
                }
            }
        }
        pop();
    }
}