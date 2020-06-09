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
			NUM_LINES:10,
			colorsPalette : ["#FF4500","#FC9900","#99AA99"]
			
		}
	},

	methods: {

	setup(sketch) {
		  sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
      	


    },
    
    draw(sketch){
    	this.lines(1,242,226,196,this.t*2,1200);
    	this.t += 0.01;
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

		    sketch.strokeWeight(w);
		    sketch.pushMatrix();
		    sketch.translate(width/2, height/2);
		    for (var i = 0; i < this.NUM_LINES; i++) {
		       sketch.stroke(r,g,b, sketch.map(i,0,this.NUM_LINES,120,255));
		       sketch.fill(r,g,b, sketch.map(i,0,this.NUM_LINES,120,255));
		       index = sketch.random(this.words.length);
		      
		       sketch.line(x1(sketch,_t + i,f), y1(sketch,_t + i,f), x2(sketch,_t + i,f), y2(sketch,_t + i,f)); 
		       sketch.pushMatrix();
		        sketch.translate(x1(_t + i,f)+10, y1(_t + i,f));
		        sketch.rotate(radians(90));
		        sketch.text(words[index],0,0 );
		       sketch.popMatrix();
    			}
    		sketch.popMatrix();
		},
	 x1(sketch,t,  f){
	     return sketch.sin(t/10) * f + sketch.sin(t/5) * f; 
		},

	 y1(sketch, t, f){
	     return sketch.cos(t/10) * f; 
		},

	 x2(sketch, t, f){
	     return sketch.sin(t/10) * f + sketch.sin(t) * 2; 
		},

	 y2( sketch,t, f){
	     return sketch.cos(t/20) * f + sketch.cos(t/12) * f;
		},
	},

	created() {

		

	}

})