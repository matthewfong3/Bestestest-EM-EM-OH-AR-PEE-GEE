class shopOption {
    constructor(x,y,width,height,text1,text2) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text1 = text1;
        this.text2 = text2;
        this.text1positionX = this.x + this.width/2;
        this.text1positionY = this.y + 20;
        this.text2positionX = this.x + this.width/2;
        this.text2positionY = this.y + this.height - 50;
    }
}