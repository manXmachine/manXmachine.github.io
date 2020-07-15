

const vm = new window.Vue({

	el: '#app',
  components: {
		
	},

	data() {
		return {
			
			createMode: true,
      restartMode: false,
			url: config.apiURL || 'http://localhost',
		  t :0,
      shareLink : "https://parametric.manxmachine.com/",
			others : [{test:"test",weight:10, count:100,speed:5,pulse:10}],
			colorsPalette : ["#feb914","#fe8826","#2c9fa2","#f03812","#aa4853","#b21236","#6f2e52","#d94d59","#25345b",],
			
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
        this.lines(sketch,this.others[i].weight/(10+(i+10)),this.colorsPalette[i],this.t*this.others[i].speed/200*(i+1),sketch.windowHeight/3+(i-1),Number(this.others[i].count)/10*(i+1),this.others[i].pulse,i);
       }
      this.t += 2;
	 },

   createShareLink: function () {
      var json = btoa(JSON.stringify(this.others));
      console.log("encoded 64",json);
      var json = this.Base64EncodeUrl(json);
      this.shareLink = "https://parametric.manxmachine.com/app?"+json;
     
      console.log("encoded urk",encodeURIComponent(json));
   },

	handleSave: function(){
    	this.getOthers();
      this.postMine();
      this.createMode = false;
      this.restartMode = true
      
       
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
	lines : function(sketch,w, _c, _t, f,  _count, _pulse, iteration) {

    //console.log("_count:",_count);

		    sketch.strokeWeight(w);
		    sketch.push();
		    sketch.translate(sketch.width/2,sketch.height/2);
		    let c = sketch.color(_c);
		   	
		    for (var i = 0; i < _count; i++) {
           c.setAlpha(sketch.map(i,0,_count,50,255))
		       sketch.stroke(c);
		       sketch.line(this.x1(sketch,_t + i,f), this.y1(sketch,_t + i,f), this.x2(sketch,_t + i,f), this.y2(sketch,_t + i,f)); 
		   	}

        if(iteration < 1){
          for (var i = 0; i < _count; i++) {
           c.setAlpha(sketch.map(i,0,_count,50,255))
           sketch.stroke(c);
           f = f - sketch.sin(this.t)* _pulse/80;
           sketch.line(this.x1(sketch,_t + i,f), this.y1(sketch,_t + i,f), this.x2(sketch,_t + i,f), this.y2(sketch,_t + i,f)); 
        }

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


   Base64EncodeUrl : function(str){
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
  },
   Base64DecodeUrl :function (str){
    str = (str + '===').slice(0, str.length + (str.length % 4));
    return str.replace(/-/g, '+').replace(/_/g, '/');
},
	},

	created() {

	  let uri = window.location.href.split('?');
    console.log(uri)
    if (uri.length == 2)
    {
      this.createMode = false;
      //let a = uri[1].split('=');
      //console.log(a);
      
        //we are good to go
        this.createMode = false;
        console.log( "url raw", uri[1]);
        let d = uri[1];
        //fb addss studff like  &fbclid=IwAR1LAyBi5MdIQ0TPdVW05Tuv3WaFQcXIM2mOU_zTrcI1HonRHwVGJQ3ekZ0
        
        d = d.split('&');
        console.log( "url raw split", d);
        //split it off
        d = d[0]
        //and keep first half again
        console.log( "url raw", d);
        //console.log( "uri[1]", uri[1])
        //console.log( "decode", decodeURIComponent(uri[1]))
        
        console.log( "decode url", d);
        d = atob(d);
        console.log( "decode64", d);
       
        let da = JSON.parse(d);
        for (var i = 0; i < da.length; i++) {
          this.others[i] = da[i] ;
          //console.log( "data", da[i]);
          //
        }
        
    }else{

      this.createMode = true
    }
  }



})