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
		}
	},

	methods: {

	setup(sketch) {
		sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
      	sketch.background('green');
      	sketch.text('Hello p5!', 20, 20);
    },
    
    draw(sketch){
    	 sketch.background(1);
    	//if(sketch.frameCount % 100== 0){
			//console.log(sketch.frameCount);
    		  
//
			this.supershape(sketch,1,sketch.height/2,100,0,40,10,10,180);
			//sketch.blendMode(sketch.LIGHTEST);
			this.supershape(sketch,2,sketch.height/3,20,25,60,55,30,150);

			this.supershape(sketch,2,sketch.height/4,200,0,1,1,1,250);

			//this.supershape(sketch,5);

    	//}
    	///this.postMood();

    	
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
	supershape : function(sketch,osc,radius,total,m,n1,n2,n3,col){

		sketch.push();
		//var m = 6;//sketch.map(sketch.sin(osc), -1, 1, 0, 10); //slider.value();
			  //this.osc += .02;
			  //console.log("osc:",osc);
			  
			  sketch.translate(sketch.width / 2, sketch.height / 2);

			  sketch.stroke(col,80);
			  sketch.strokeWeight(10);
			  sketch.noFill();

			  //var radius = sketch.height/3;

			 // var total = 500;
			  var increment = sketch.TWO_PI / total;

			  sketch.beginShape();
			  for (var angle = 0; angle < sketch.TWO_PI; angle += increment) {
			    var r = this.supershape_factor(sketch,angle,m,n1,n2,n3);
			    r += sketch.random(-.02,.02);
			    //console.log("r:",r);
			    var x = radius * r * sketch.cos(angle);
			    var y = radius * r * sketch.sin(angle);
			    //sketch.ellipse(x,y,10,10)
			    sketch.vertex(x,y);
			  }
			  sketch.endShape(sketch.CLOSE);
			sketch.pop();

	}

	},

	created() {

		

	}

})