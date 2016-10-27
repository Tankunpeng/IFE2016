
// 飞船
function Space(){}

// 动力系统
function Engine(){
  space = this;
  
}
Engine.prototype.start = function(){

}
Engine.prototype.turnover = function(){

}

// 能量系统
function Energy(){
  energy=100;
}
Energy.prototype.charge = function(){
  this.energy+=2;
}
Energy.prototype.use = function(){
  this.energy-=5;
}

// 信号系统
function SignalReceiver(){}

// 自毁系统
function Destruction(){}

// 信号传播介质
function Mediator(){}

// 指挥官
function Commander(){}

// 行星
function Planet(){
  var 
}


// 指令
function Order(){
  id: 1;
  commond: "stop";
}


