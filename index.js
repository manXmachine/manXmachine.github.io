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
			NUM_LINES:50,
			count:10,
			pulse:5,
			div:1,
			colorsPalette : ["#FF4500","#FC9900","#99AA99"],
			words : [ "fearful", "scared", "anxious", "optimsitic", "happy", "thankful" ],
			
		}
	},

	methods: {

	setup(sketch) {
		  sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
		  sketch.createLoop({duration:15,gif:true})
     },
    
    draw(sketch){
    	sketch.background(0);
    	this.lines(sketch,1,242,226,196,this.t*2,sketch.windowHeight/4);
    	this.lines(sketch,1,242,185,15,this.t*2,sketch.windowHeight/4+sketch.sin(this.t)*this.pulse);
	   
	     this.lines(sketch,1,217,43,4,this.t,sketch.windowHeight/2.5);
	     this.lines(sketch,1,28,108,140,this.t,sketch.windowHeight/2.5+sketch.sin(this.t)*this.pulse);
	    

	     this.lines(sketch,1,227,43,4,this.t/2,sketch.windowHeight/3.5);
	     this.lines(sketch,1,228,108,140,this.t/2,sketch.windowHeight/3.5+sketch.sin(this.t)*this.pulse);
	    

    /*this.lines(sketch,1,242,185,15,this.t*.5,380);
    this.lines(sketch,1,242,121,15,this.t,250);
     this.lines(sketch,1,217,43,4,this.t,140);
     this.lines(sketch,1,28,108,140,this.t,640);*/
    	this.t += .2;
    	//console.log("this.t",this.t);

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
		    //sketch.blendMode(sketch.MULTIPLY);
		    sketch.fill(r,g,b,255);
		   	//sketch.ellipse(0,0,100,100);
		   	//sketch.fill(0);
		   	//sketch.textAlign(sketch.CENTER, sketch.CENTER)
		    //sketch.text(this.words[sketch.floor(sketch.random(4))],0,0);
		    //console.log(sketch.random(4));
		    for (var i = 0; i < this.count; i++) {
		       sketch.stroke(r,g,b, sketch.map(i,0,this.count,2,255));
		       sketch.fill(r,g,b, sketch.map(i,0,this.count,2,255));
		       sketch.line(this.x1(sketch,_t + i/this.div,f), this.y1(sketch,_t + i/this.div,f), this.x2(sketch,_t + i/this.div,f), this.y2(sketch,_t + i/this.div,f)); 
		       
    		}

    		sketch.pop();
		},
	 x1 : function(sketch,t,  f){
	     return sketch.sin(t/10) * f + sketch.sin(t/5) ; 
		},

	 y1 : function(sketch, t, f){
	     return sketch.cos(t/10) * f; 
		},

	 x2 : function(sketch, t, f){
	     return sketch.sin(t/5) * f + sketch.sin(t) * 2; 
		
		},

	 y2 : function( sketch,t, f){
	     return sketch.cos(t/20) * f + sketch.cos(t/12) * f;
		},
	},

	created() {

		

	}

})