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
		  t :0,

			myCount:10,
			myPulse:5,
			mySpeed:5,
			myWeight:5,
      myDiv:1,


      oneCount:0,
      onePulse:2,
      oneSpeed:2,
      oneWeight:2,
      oneDiv:1,


      twoCount:0,
      twoPulse:2,
      twoSpeed:2,
      twoWeight:2,
      twoDiv:1,

			record:false,
      recordingStarted:false,
			
			colorsPalette : ["#FF4500","#FC9900","#99AA99"],
			
		}
	},

	methods: {

	 setup(sketch) {
		  sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
      this.pg = sketch.createGraphics(800, 800);
    },
    
    draw(sketch){
      
    	sketch.background(0);
    	
      if(this.oneCount != 0){
        this.lines(sketch,this.oneWeight,217,43,4,this.t*this.oneSpeed,sketch.windowHeight/2.5,this.oneDiv,this.oneCount);
        this.lines(sketch,this.oneWeight,28,108,140,this.t*this.oneSpeed,sketch.windowHeight/2.5+sketch.sin(this.t)*this.onePulse,this.oneDiv,this.oneCount);
      }

      
       if(this.twoCount != 0){
        this.lines(sketch,this.twoWeight,217,43,4,this.t*this.twoSpeed,sketch.windowHeight/2.5,this.twoDiv,this.twoCount);
        this.lines(sketch,this.twoWeight,28,108,140,this.t*this.twoSpeed,sketch.windowHeight/2.5+sketch.sin(this.t)*this.twoPulse,this.twoDiv,this.twoCount);
        }
	 


      this.lines(sketch,this.myWeight,242,226,196,this.t*this.mySpeed,sketch.windowHeight/4,this.myDiv,this.myCount);
      this.lines(sketch,this.myWeight,242,185,15,this.t*this.mySpeed,sketch.windowHeight/4+sketch.sin(this.t)*this.myPulse,this.myDiv,this.myCount);

	    
    	
    	
    if(this.record == true){

      if(this.recordingStarted == false){
    	  this.recordingStarted = true;
        this.capturer.start();
       }
        
    	this.pg.background(0); 
    	this.lines(this.pg,this.myWeight,242,226,196,this.t*this.mySpeed,sketch.windowHeight/4,this.myDiv,this.myCount);
      this.lines(this.pg,this.myWeight,242,185,15,this.t*this.mySpeed,sketch.windowHeight/4+sketch.sin(this.t)*this.myPulse,this.myDiv,this.myCount);
     
	    this.lines(this.pg,this.oneWeight,217,43,4,this.t*this.oneSpeed,sketch.windowHeight/2.5,this.oneDiv,this.oneCount);
      this.lines(this.pg,this.oneWeight,28,108,140,this.t*this.oneSpeed,sketch.windowHeight/2.5+sketch.sin(this.t)*this.onePulse,this.oneDiv,this.oneCount);
     
   
	    

	    //this.lines(this.pg,1,227,43,4,this.t/2,sketch.windowHeight/3.5);
	    //this.lines(this.pg,1,228,108,140,this.t/2,sketch.windowHeight/3.5+sketch.sin(this.t)*this.pulse);
	    this.capturer.capture(this.pg.canvas);
    		
    	
    	if(sketch.frameCount % 50 == 0){

        this.record = false;
        this.recordingStarted = false;
    	  this.capturer.stop()
        this.capturer.save()

       }

      }

      this.t += .2;
	 },

  handleShare: function(){
      this.record = true;
      
    },

	handleSave: function(){
    	
      
      this.getOthers();
      
      this.postMine();
    },

  getOthers() {
      let root = this
      axios.get(this.url+"?limit=2").then((response) => {
        console.log('others', response.data)

        //root.currentMood = response.data.mood
        this.oneCount = response.data[0].count;
        this.onePulse = response.data[0].pulse;
        this.oneSpeed = response.data[0].speed;
        this.oneWeight = response.data[0].weight;
        this.oneDiv = response.data[0].div;


        this.twoCount = response.data[1].count;
        this.twoPulse = response.data[1].pulse;
        this.twoSpeed = response.data[1].speed;
        this.twoWeight = response.data[1].weight;
        this.twoDiv = response.data[1].div;

      })
    },

   getTwo() {
      let root = this
      axios.get(this.url).then((response) => {
        console.log('Last mood', response.data)
        root.currentMood = response.data.mood
      })
    },

 	postMine : function () {
			let root = this
			axios.post(this.url, {
				count:this.myCount,
        pulse:this.myPulse,
        speed:this.mySpeed,
        weight:this.myWeight,
        div:this.myDiv,

       }).then((response) => {
				console.log('OK:', response)
			}).catch((response) => {
				console.log('ERROR:', response)
			})
		},
	lines : function(sketch,w, r,  g,  b, _t, f, _div, _count) {

		    sketch.strokeWeight(w);
		    sketch.push();
		    sketch.translate(sketch.width/2,sketch.height/2);
		   
		   	
		    for (var i = 0; i < _count; i++) {
		       sketch.stroke(r,g,b, sketch.map(i,0,_count,120,255));
		       sketch.line(this.x1(sketch,_t + i/_div,f), this.y1(sketch,_t + i/_div,f), this.x2(sketch,_t + i/_div,f), this.y2(sketch,_t + i/_div,f)); 
		   	
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

		this.capturer = new CCapture({
        format: 'gif', workersPath: './',
        verbose: false, display: false,
        framerate: 30, frameLimit: 100
      });
    //this.capturer.start();
  
	}

})