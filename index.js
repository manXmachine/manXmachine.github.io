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
			t :0,
			NUM_LINES:20,
			colorsPalette : ["#FF4500","#FC9900","#99AA99"]
			
		}
	},

	methods: {

	setup(sketch) {
		  sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
      	


    },
    
    draw(sketch){
    	sketch.background(0);0
    	this.lines(sketch,1,242,226,196,this.t*2,sketch.windowHeight/2);
    	this.lines(sketch,1,242,185,15,this.t*5,1280);
    this.lines(sketch,1,242,121,15,this.t,1240);
     this.lines(sketch,1,217,43,4,this.t,540);
     this.lines(sketch,1,28,108,140,this.t,740);
     this.lines(sketch,1,242,226,196,this.t*2,100);
    this.lines(sketch,1,242,185,15,this.t*.5,380);
    this.lines(sketch,1,242,121,15,this.t,250);
     this.lines(sketch,1,217,43,4,this.t,140);
     this.lines(sketch,1,28,108,140,this.t,640);
    	this.t += 1;
    	console.log("this.t",this.t);
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
	lines : function(sketch,w, r,  g,  b, _t, f) {

		   // sketch.strokeWeight(w);
		    sketch.push();
		    sketch.translate(sketch.windowWidth/2,sketch.windowHeight/2);
		    for (var i = 0; i < this.NUM_LINES; i++) {
		       sketch.stroke(r,g,b, sketch.map(i,0,this.NUM_LINES,120,255));
		       sketch.fill(r,g,b, sketch.map(i,0,this.NUM_LINES,120,255));
		       //index = sketch.random(this.words.length);
		      
		       sketch.line(this.x1(sketch,_t + i,f), this.y1(sketch,_t + i,f), this.x2(sketch,_t + i,f), this.y2(sketch,_t + i,f)); 
		       //sketch.push();
		       // sketch.translate(x1(_t + i,f)+10, y1(_t + i,f));
		        //sketch.rotate(radians(90));
		        //sketch.text(words[index],0,0 );
		       //sketch.pop();
    			}
    		sketch.pop();
		},
	 x1 : function(sketch,t,  f){
	     return sketch.sin(t/10) * f + sketch.sin(t/5) * f; 
		},

	 y1 : function(sketch, t, f){
	     return sketch.cos(t/10) * f; 
		},

	 x2 : function(sketch, t, f){
	     return sketch.sin(t/10) * f + sketch.sin(t) * 2; 
		},

	 y2 : function( sketch,t, f){
	     return sketch.cos(t/20) * f + sketch.cos(t/12) * f;
		},
	},

	created() {

		

	}

})