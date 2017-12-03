class button {
  constructor(x,y, opts) {
    opts = opts || {};
    
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 50;
    this.text = opts.text || '---';
    this.available = opts.available || true;
    this.callback = emptyFunct;
    
  }
  
  setText(text){
    this.text = text;
  }
}