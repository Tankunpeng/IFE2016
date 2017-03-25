
// (function model(){
	// 飞船
	function Space(id){
		this.id = id;
		log("new space#"+this.id + " is created!")

	}

	Space.prototype = function(){
		var _energy = 100;
		var _state = "stop";
		var _engine = {
			engine:null,
			turnover: function(){
				_state = "fly"
				engine = setInterval(_consume,1000,5)
			},
			turnoff: function(){
				state = "stop";
				clearInterval(engine);
			}
		}
		var _consume = function(num){
			_energy-=num;
			log("#"+this.constructor.id+" cunsume "+num+" of "+_energy+" energy")
		}
		var _charge = function(num){
			_energy+=num;
		}
		return {

				constructor: Space,
				start: function(){
					log("[space#]"+this.id+" start!")
					_engine.turnover()
				},
				stop: function(){
					log("[space#]"+this.id+" stop!")
					_engine.turnoff()
				},

				destory: function(){
					log("[space#]"+this.id+" destory!");
					this.id = -1;
				},

				receiver: function(msg){
					log("[Space] #" + this.id + " received " + msg.command)
					if(msg.id === this.id){
						log("[Space] #" + this.id + " exect " + msg.command)
						this[msg.command]()
					}
				}
			}
		}()


	// 信号传播介质
	function Mediator(){
		var spacelist = [];
		var curMsg = {};

		return {

			broadcast: function(msg){
				for(i in spacelist){

					spacelist[i].receiver(msg)
				}
			},

			receive: function(msg){
				curMsg = msg;
				log("[mediator] receive: "+msg.command)
				if(msg.command === "create"){
					setTimeout(this.create,1000)	
				}
				else{
					setTimeout(this.broadcast, 1000, msg)
				}	
			},

			create: function(){
				var reuse = spacelist.filter(function(x){ return x.id === -1});
				//spacelist = spacelist.filter(function(x){ return x.id !== -1});
				if(reuse.length){
					reuse[0].id =  spacelist.length;
				}
				else{
					space = new Space(spacelist.length);
					spacelist.push(space);
				}	}	}
		}
				
	// 行星
	function Planet(){
	  this.mediator = new Mediator;
	  this.commander = new Commander(this);
	}
	Planet.prototype.sender = function (order){
		log("[Plant.sender] send "+order.command + " to [mediator.receive]" )
		this.mediator.receive(order);
			
		}

	// 指挥官
	function Commander(plantet){
		this.plantet = plantet;
	}

	Commander.prototype.order = function(commdnd,id){
		var newcommdnd = { "id": id, "command": commdnd}
		log("[commander] send: " + newcommdnd.command + " to [Plant.sender]" )
		this.plantet.sender(newcommdnd)	
	}

	log = console.log;



	// function run(){
		//var mediator = new Mediator;
		var planet = new Planet;
		var commander = planet.commander;
		//commander.order("create");
		//commander.order("create");
		//commander.order("start",1);
		//commander.order("stop",1);
		//commander.order("destory",1);
	// // }

	// run()

// })()

function $(id){	return document.getElementById(id); }


