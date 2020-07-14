

const vm = new window.Vue({

	el: '#app',
  components: {
		
	},

	data() {
		return {
			
			createMode: true,
			url: config.apiURL || 'http://localhost',
		  t :0,
      shareLink : "https://www.facebook.com/sharer/sharer.php?u=https://parametric.manxmachine.com/",
			others : [{test:"test",weight:10, count:100,speed:5,pulse:10}],
			colorsPalette : ["#a8e6fb","#faea68","#427abb","#e74865","#6f2e52","#d94d59","#25345b","#aa4853"],
			
		}
	},

	methods: {

	 setup(sketch) {
		  sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
      sketch.strokeCap(sketch.SQUARE);
    },
    
    draw(sketch){
      
    	sketch.background(0);
      
    
      for (var i = 0; i < this.others.length; i++) {
        console.log(i);
        this.lines(sketch,this.others[i].weight/10,this.colorsPalette[i],this.t*this.others[i].speed/200,sketch.windowHeight/(2.5),Number(this.others[i].count)/10,this.others[i].pulse/2);
        //this.lines(sketch,1,this.colorsPalette[i],this.t*this.others[i].speed/100,sketch.windowHeight/(2.5+i/4)+sketch.sin(this.t/10)*this.others[i].pulse/100,this.others[i].div,Number(this.others[i].count)/10);
      }
        
      //this.lines(sketch,this.myWeight/10,this.colorsPalette[0],this.t*this.mySpeed/100,sketch.windowHeight/4,this.myCount/10,this.myPulse);
      //this.lines(sketch,this.others[0].weight/10,this.colorsPalette[0],this.t*this.others[0].speed/200,sketch.windowHeight/(10),Number(this.others[0].count)/10,this.others[0].pulse/2);
        
      //this.lines(sketch,1,this.colorsPalette[1],this.t*this.mySpeed/100,sketch.windowHeight/4+sketch.sin(this.t/10)*this.myPulse/10,this.myDiv,this.myCount/10);

  	 this.t += 2;
	 },

   createShareLink: function () {
      var json = btoa(JSON.stringify(this.others));
      this.shareLink = "https://www.facebook.com/sharer/sharer.php?u=https://parametric.manxmachine.com/app?archive="+json;
     
      console.log("encoded",json)
   },

	handleSave: function(){
    	this.getOthers();
      this.postMine();
      
       
  },

  getOthers() {
      let root = this
      //Starting at the 5th item, return 3 items from a collection of 10
      axios.get(this.url+"?limit=3").then((response) => {
      
      //this.others = [];
       
        for (var i = 0; i < response.data.length; i++) {
            this.others[i+1] = response.data[i] ;
            
        }
      //console.log("others:",this.others.length);
      this.createShareLink();
      })
    },


 	postMine : function () {
			let root = this
			axios.post(this.url, {
				count:this.others[0].count,
        pulse:this.others[0].pulse,
        speed:this.others[0].speed,
        weight:this.others[0].weight,
       

       }).then((response) => {
				console.log('OK:', response)
			}).catch((response) => {
				console.log('ERROR:', response)
			})
		},
	lines : function(sketch,w, _c, _t, f,  _count, _pulse) {

    //console.log("_count:",_count);

		    sketch.strokeWeight(w);
		    sketch.push();
		    sketch.translate(sketch.width/2,sketch.height/2);
		    let c = sketch.color(_c);
		   	
		    for (var i = 0; i < _count; i++) {
           c.setAlpha(sketch.map(i,0,_count,10,255))
		       sketch.stroke(c);
		       sketch.line(this.x1(sketch,_t + i,f), this.y1(sketch,_t + i,f), this.x2(sketch,_t + i,f), this.y2(sketch,_t + i,f)); 
		   	}

        for (var i = 0; i < _count; i++) {
           c.setAlpha(sketch.map(i,0,_count,50,100))
           sketch.stroke(c);
           f = f - sketch.sin(this.t)* _pulse/100;
           sketch.line(this.x1(sketch,_t + i,f), this.y1(sketch,_t + i,f), this.x2(sketch,_t + i,f), this.y2(sketch,_t + i,f)); 
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

	let uri = window.location.href.split('?');
    
    if (uri.length == 2)
    {
      this.createMode = false;
      let a = uri[1].split('=');
      console.log(a);
      if(a[0] == 'archive'){
        //we are good to go
        this.createMode = false;
         let d = atob(a[1]);
         let da = JSON.parse(d);
         for (var i = 0; i < da.length; i++) {
            this.others[i] = da[i] ;
            //console.log( "data", da[i]);
         }
      }
      else{
        ///some other arg that we can ignore
        this.createMode = true
      }
    }else{

      this.createMode = true
    }
  }

})