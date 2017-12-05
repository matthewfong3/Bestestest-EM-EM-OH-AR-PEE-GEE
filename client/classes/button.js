class button {
  constructor(x,y, opts) {
    opts = opts || {};
    
    this.x = x;
    this.y = y;
    this.width = opts.width || 200;
    this.height = opts.height || 50;
    this.text = opts.text || '---';
    this.available = opts.available || true;
    this.callback = opts.callback || emptyFunct;
    this.textColor = opts.textColor || 'black';
  }
  
  setText(text){
    this.text = text;
  }
  
  setAvailable(){
    this.available = true;
  }
  
  setUnavailable(){
    this.available = false;
  }
  
  moveTo(x, y){
    this.x = x;
    this.y = y;
  }
}