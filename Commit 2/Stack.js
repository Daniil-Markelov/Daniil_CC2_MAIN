class Stack {
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
        this.total = [];
        this.acolors = [
            color('red'),
            color('blue'),
            color('white'),
        ];
        this.icolors = [
            color('#99ffb2'),
            color('#7acc8f'),
            color('#5c996b'),
            color('#3d6647'),
        ];

        this.showValues = true;
        this.showLabels = true;
        this.rotateLabels = false;
        this.valuetext = 3;
        this.titleoffset = 10;
        this.myNumber = 100;
        this.myNumberMin = 0;
        this.myNumberMax = 1000;
        this.myNumberStep = 10;

    }

    updateValue() {
        this.tickSpacing = this.chartHeight / this.numTicks;
        this.remainder = this.chartWidth - (this.margin * 2) - (this.spacing * (this.data.length - 1));
        this.barWidth = this.remainder / this.data.length;

        let listValues = this.data.map(function(x) { return x.cdtotal })
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

            for (let j = 0; j < this.data[i].cd.length; j++) {
                let colorNum = j % 4;

                fill(this.icolors[colorNum]);
                noStroke();
                rect(i * (this.barWidth + this.spacing), 0, this.barWidth, this.scaledData(-this.data[i].cd[j]));
                translate(0, this.scaledData(-this.data[i].cdtotal[j]));


                if (this.showValues) {
                    noStroke();
                    fill(36, 102, 194);
                    textSize(16);
                    textAlign(CENTER, BOTTOM);
                    text(this.data[i].cdname[j], i * (this.barWidth + this.spacing) + this.barWidth / 2, this.scaledData(-this.data[i].cd[j]) + 20);
                    //text("deaths", i * (this.barWidth + this.spacing) + this.barWidth / 2, 0);

                }
                if (this.showLabels) {
                    push();
                    noStroke();
                    fill(255);
                    textSize(14);
                    textAlign(CENTER, BOTTOM);
                    text(this.data[i].name, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, 20);
                    pop();
                }




            }

        }
        pop();
    }
}