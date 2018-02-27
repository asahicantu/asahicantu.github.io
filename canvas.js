
var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext('2d');

function Color(){
  this.r =parseInt(Math.random() * 255);
  this.g =parseInt(Math.random() * 255);
  this.b =parseInt(Math.random() * 255);
  this.a = Math.random();    
  this.setRGBA = function(r,g,b,a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;    
  }

  this.setAlpha = function(a){
    this.a = a;
  }

  this.getRRBAChar = function(){
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
  }

  this.getRRBAChar = function (a) {
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + a + ')';
  }
}

class Circle{
  set createNewCircle(create){
    this._createNewCircle =  create;
  }
  get createNewCircle(){
    return this._createNewCircle;
  }

  constructor(circles){
    this.gravityFactor = 0.5;
    this.method = "rebound";
    this._createNewCircle = true;
    this.circles = circles;
    this.radius = Math.random() * 50;
    var diameter = this.radius * 2;
    this.x = Math.random() * ( innerWidth  - diameter) + this.radius;
    this.y = Math.random() * (innerHeight - diameter) + this.radius;
    this.dx = Math.random() * 5;
    this.dy = Math.random() * 5;
    this.color = new Color();
    this.dxIncrement = 5;
    this.dyIncrement = 5;
    this.startAngle=0;
    this.endAngle = Math.PI* 2;
    this.drawCounterClockWise = false;
  }

  setGravity(gravityFactor){
    this.method = 'gravity';
    this.gravityFactor = gravityFactor;
    this.dy = 0;
    this.y = this.radius;
  }
  
  draw(c){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.drawCounterClockWise)
    c.strokeStyle = this.color.getRRBAChar();
    c.fillStyle = this.color.getRRBAChar(0.3);
    c.fill();
    c.stroke();
   }

  tryCreateCircle(displacement){
    if (this.createNewCircle && circles.length < 500){
      //var circle = new Circle(circles);
      //circles.push(circle);
    }
    this.radius += Math.abs(displacement);
   }

  checkLayoutFor(position, offset,displacement){
    if(position + this.radius + displacement >  offset || position - this.radius + displacement < 0){
      this.tryCreateCircle(displacement);
      return  -1;
    }
    return 1;
  }

  refresh(c){
    switch (this.method) {
      case 'rebound':
        this.dx *= this.checkLayoutFor(this.x, innerWidth, this.dx);
        this.dy *= this.checkLayoutFor(this.y, innerHeight, this.dy);
        this.x += this.dx;
        this.y += this.dy;
        break;
      case 'gravity':
        this.y = (this.y + 1) * this.gravityFactor;
        break;
      default:
        break;
    }
    
  }
}

var circles = [];
for(var i = 0;i < 1;i++){
  let circle = new  Circle(circles);
  circle.setGravity(1.05);
  circle.draw(c);
  circles.push(circle);
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  for(var i = 0;i < circles.length;i++){
    var circle = circles[i];
    circle.refresh(c);
    circle.draw(c);
  }
}
animate();