const load = (component) => { 
	return window.httpVueLoader('components/' + component + '.vue')
}

const vm = new window.Vue({

	el: '#app',

	components: {
		'mood-button': load('mood-button'),
	},

	data() {
		return {
			salutation: 'Hello',
			currentMood: '',
			url: config.apiURL || 'http://localhost',
			n1 : 1.3,
			n2 : 0.3,
			n3 : 0.3,
			m : 53,
			a : 1,
			b : 1,
			osc : 0,
			colorsPalette : ["#FC9999","#FC9900","#99AA99"]
			
		}
	},

	methods: {

	setup(sketch) {
		  sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
      	sketch.background('green');
      	sketch.text('Hello p5!', 20, 20);
    },
    
    draw(sketch){
    	 sketch.background(255);
    	 //sketch.blendMode(sketch.OVERLAY);
    	//if(sketch.frameCount % 100== 0){
    	//sketch.directionalLight(55,sketch.windowWidth/2,sketch.windowHeight/2,5000);
    	//
    	//
    	//
    	//sketch.lights();
    	//sketch.normalMaterial();
			//console.log(sketch.frameCount);
    	//sketch.camera(sketch.windowWidth/2,sketch.windowHeight/2  ,1000, sketch.windowWidth/2, sketch.windowHeight/2, 0, 0, -1, 0);  
			//sketch.directionalLight(255, sketch.windowWidth/2, sketch.windowHeight/2-1000, 2000 + sketch.sin(sketch.frameCount * 10) * 10)
			this.supershape(sketch,sketch.windowWidth/3,sketch.windowHeight/2,.01,2,sketch.height/4,100,0,.40,.10,.10,this.colorsPalette[0]);
			this.supershape(sketch,sketch.windowWidth/2,sketch.windowHeight/3,.01,8,sketch.height/5,100,0,.3,.3,.3,this.colorsPalette[2]);
			//sketch.blendMode(sketch.MULTIPLY);
			this.supershape(sketch,sketch.windowWidth/3,sketch.windowHeight/2,.05,10,sketch.height/6,20,25,2,5,3,this.colorsPalette[1]);
			
			this.supershape(sketch,sketch.windowWidth/2,sketch.windowHeight/2,.03,20,sketch.height/8,200,10,1,1,1,this.colorsPalette[2]);

			//this.supershape(sketch,5);

    	//}
    	///this.postMood();

    	this.osc += .002;
	},

 	postMood : function () {
			let root = this
			//let previousIcon = this.currentIcon

			//this.currentIcon = this.loadingIcon

			axios.post(this.url, {
				mood: "happy"
			}).then((response) => {
				console.log('OK:', response)
				//root.currentIcon = previousIcon
			}).catch((response) => {
				console.log('ERROR:', response)
			})
		},
	supershape_factor : function(sketch,theta,m,n1,n2,n3) {

		  var part1 = (1 / this.a) * sketch.cos(theta * m / 4);
		  part1 = sketch.abs(part1);
		  part1 = sketch.pow(part1, n2);
	  
		  var part2 = (1 / this.b) * sketch.sin(theta * m / 4);
		  part2 = sketch.abs(part2);
		  part2 = sketch.pow(part2, n3);
		 
		  var part3 = sketch.pow(part1 + part2, 1 / n1);

		  if (part3 === 0) {
		    return 0;
		  }

		  return (1 / part3);
		},
	supershape : function(sketch,xPos,yPos,osc,pulse,radius,total,m,n1,n2,n3,col){

		sketch.push();
		//var m = 6;//sketch.map(sketch.sin(osc), -1, 1, 0, 10); //slider.value();
			  //this.osc += .02;
			  //console.log("osc:",osc);
			  
			  sketch.translate(xPos,yPos);
			  c = sketch.color(col);
			  c.setAlpha(98)
			  sketch.fill(c);
			  
			  sketch.noStroke();

			  //var radius = sketch.height/3;

			 // var total = 500;
			  var increment = sketch.TWO_PI / total;

			  sketch.beginShape();
			  //sketch.blendMode(sketch.OVERLAY);
			  for (var angle = 0; angle < sketch.TWO_PI; angle += increment) {
			    m += sketch.sin(this.osc);

			    var r = this.supershape_factor(sketch,angle,m,n1,n2,n3);
			    r += sketch.sin(this.osc+osc);
			    //console.log("r:",r);
			    var x = radius * r * sketch.cos(angle);
			    var y = radius * r * sketch.sin(angle);
			    sketch.vertex(x,y);
					//sketch.strokeWeight(1);
			  	//sketch.stroke(255);
			    //sketch.ellipse(x,y,10,10)
			    //sketch.noStroke();
			    
			  }
			  sketch.endShape(sketch.CLOSE);
			sketch.pop();

	}

	},

	created() {

		

	}

})