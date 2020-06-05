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
			colorsPalette : ["#FF4500","#FC9900","#99AA99"]
			
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
			this.supershape(sketch,(sketch.windowWidth/2)+sketch.sin(this.osc)*200,(sketch.windowHeight/2)+sketch.sin(this.osc)*20,.01,2,sketch.height/6,3,.3,.3,.3,this.colorsPalette[0],true);
			///sketch,xPos,yPos,osc,pulse,radius,m,n1,n2,n3,col
			///
			///
			///fo
			///
			//this.supershape(sketch, sketch.random(sketch.windowWidth), sketch.random(sketch.windowHeight),sketch.random(2),sketch.random(10),sketch.random(sketch.height/10),5,40,10,10,this.colorsPalette[sketch.floor(sketch.random(2))],true);

			this.supershape(sketch,sketch.windowWidth/2+sketch.sin(this.osc)*500,sketch.windowHeight/2+sketch.sin(this.osc)*20,2,2,sketch.height/10,5,40,10,10,this.colorsPalette[1],true);
			this.supershape(sketch,sketch.windowWidth/4+sketch.sin(this.osc)*20,sketch.windowHeight/4+sketch.sin(this.osc)*20,2,2,sketch.height/10,5,60,55,10,this.colorsPalette[2],true);
			this.supershape(sketch,sketch.windowWidth/3+sketch.sin(this.osc)*200,sketch.windowHeight/6+sketch.sin(this.osc)*50,.09,2,sketch.height/10,50,3,1,1,1,this.colorsPalette[0],false);
			this.supershape(sketch,sketch.windowWidth/5+sketch.sin(this.osc)*100,sketch.windowHeight/5+sketch.sin(this.osc)*10,.01,8,sketch.height/10,100,0,.3,.3,.3,this.colorsPalette[0],true);


this.supershape(sketch,sketch.windowWidth/2+sketch.sin(this.osc)*500,sketch.windowHeight/2+sketch.sin(this.osc)*20,2,2,sketch.height/10,5,40,10,10,this.colorsPalette[1],true);
			this.supershape(sketch,sketch.windowWidth/4+sketch.sin(this.osc)*20,sketch.windowHeight/4+sketch.sin(this.osc)*20,2,2,sketch.height/10,5,60,55,10,this.colorsPalette[2],true);
			this.supershape(sketch,sketch.windowWidth/8+sketch.sin(this.osc)*200,sketch.windowHeight/9+sketch.sin(this.osc)*50,.09,2,sketch.height/10,50,3,1,1,1,this.colorsPalette[0],false);
			this.supershape(sketch,sketch.windowWidth/2+sketch.sin(this.osc)*100,sketch.windowHeight/3+sketch.sin(this.osc)*10,.01,8,sketch.height/10,100,0,.3,.3,.3,this.colorsPalette[2],true);



this.supershape(sketch,sketch.windowWidth/2+sketch.sin(this.osc)*500,sketch.windowHeight/2+sketch.sin(this.osc)*20,2,2,sketch.height/10,5,40,10,10,this.colorsPalette[1],true);
			this.supershape(sketch,sketch.windowWidth/4+sketch.sin(this.osc)*20,sketch.windowHeight/3+sketch.sin(this.osc)*20,2,2,sketch.height/10,5,60,55,10,this.colorsPalette[2],true);
			this.supershape(sketch,sketch.windowWidth/2+sketch.sin(this.osc)*80,sketch.windowHeight/2+sketch.sin(this.osc)*50,.09,2,sketch.height/10,50,3,1,1,1,this.colorsPalette[1],true);
			this.supershape(sketch,sketch.windowWidth/5+sketch.sin(this.osc)*100,sketch.windowHeight/5+sketch.sin(this.osc)*10,.01,8,sketch.height/10,100,0,.3,.3,.3,this.colorsPalette[0],true);


this.supershape(sketch,sketch.windowWidth/2+sketch.sin(this.osc)*500,sketch.windowHeight/2+sketch.sin(this.osc)*20,2,2,sketch.height/10,5,40,10,10,this.colorsPalette[1],true);
			this.supershape(sketch,sketch.windowWidth/4+sketch.sin(this.osc)*20,sketch.windowHeight/4+sketch.sin(this.osc)*20,2,2,sketch.height/10,5,60,55,10,this.colorsPalette[2],true);
			this.supershape(sketch,sketch.windowWidth/9+sketch.sin(this.osc)*100,sketch.windowHeight/6+sketch.sin(this.osc)*50,.09,2,sketch.height/10,50,3,1,1,1,this.colorsPalette[0],false);
			this.supershape(sketch,sketch.windowWidth/5+sketch.sin(this.osc)*800,sketch.windowHeight/8+sketch.sin(this.osc)*100,.01,8,sketch.height/.10,100,0,.3,.3,.3,this.colorsPalette[1],true);

		  
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
	supershape : function(sketch,xPos,yPos,osc,pulse,radius,m,n1,n2,n3,col,fill){

		// etc shape has a starting point
		// an oscillation factor 
		// ///pulse
		// radius
		// 
		// m   - will be 1-6 and not change 
		// n1 2 falvours here --- 
		// n2
		// n3
		// colour
		// 
		// total points - constant on all of the,
		// 
		// //shapes info http://paulbourke.net/geometry/supershape/


		    sketch.push();
		    //var m = 6;//sketch.map(sketch.sin(osc), -1, 1, 0, 10); //slider.value();
			  //this.osc += .02;
			  //console.log("osc:",osc);
			  //xPos += sketch.sin(this.osc);
			 // yPos += sketch.sin(this.osc);
			  
			  //get in pos
			  sketch.translate(xPos,yPos);

			  sketch.rotate(sketch.sin(this.osc));

			  //setup colour
			  c = sketch.color(col);
			  c.setAlpha(100)
			  sketch.stroke(c);
			  sketch.strokeWeight(25);
			  sketch.noFill();
			  
			  if(fill ==true){
			  	 sketch.strokeWeight(25);
			  	 sketch.fill(c);
			  }
			  
			 

			 
				var increment = sketch.TWO_PI / 100;

			  sketch.beginShape();
			  //sketch.blendMode(sketch.OVERLAY);
			  for (var angle = 0; angle < sketch.TWO_PI; angle += increment) {
			   
			    var r = this.supershape_factor(sketch,angle,m,n1,n2,n3);
			    r += sketch.sin(this.osc/10);
			    //console.log("r:",r);
			    var x = radius * r * sketch.cos(angle);
			    var y = radius * r * sketch.sin(angle);
			    sketch.vertex(x,y);
					
			    
			  }
			  sketch.endShape(sketch.CLOSE);
			  sketch.pop();

	}

	},

	created() {

		

	}

})