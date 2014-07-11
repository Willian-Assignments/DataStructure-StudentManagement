//Global Method
var inherit = function(subclass,superclass){
	subclass.method = superclass;
	subclass.method();
	delete subclass.method;
};
//predefines
var curriculum = new Array();
curriculum = {
	"000000":"未定义",
	"201401":"2014学年第1学期",
};
//Abstract Classes
var Node = function(){
	this.key = null;

	//Overrides
	this.valueOf = function (){
		if(this.key!=null){
			return this.key().valueOf();
		}
		return this.constructor.valueOf();
	};
	this.toString = function (){
		if(this.key!=null){
			return this.key().toString();
		}
		return this.constructor.toString();
	};
	return this;
};
var BST = function(){
	inherit(this,Node);
	this.lChild = null;
	this.rChild = null;
	this.parent = null;

	return this;
};

var Chain = function(){
	inherit(this,Node);
	this.privous	 = null;
	this.next 		 = null;
	//Constructor
	this.insertNext = function(){
		var chain = new this.constructor;
		this.connectNext(chain);
		return chain;
	};
	this.insertBefore = function(){
		var chain = new this.constructor;
		this.connectBefore(chain);
		return chain;
	};
	//Delete
	this.deleteAllNexts = function(){
		if(this.next!=null){
			this.next.deleteAllNexts();
		}
		delete this;
		return;
	};
	//Lookup
	this.findBegin = function(){
		if(this.privous!=null){
			return this.privous.findBegin();
		}else{
			return this;
		}
	};
	//Method
	this.connectNext = function(chain){
		this.next 		= chain;
		chain.privous 	= this;
	};
	this.connectBefore = function(chain){
		chain.next 		= this;
		this.privous 	= chain;
	};
	this.disconnectNext = function(){
		if(this.next.privous === this){
			this.next.privous = null;
			this.next 		  = null;
			return true;
		}
		return false;
	};
	this.disconnectPrivous = function (){
		if(this.privous.next === this){
			this.privous.next = null;
			this.privous	  = null;
			return true;
		}
		return false;
	};
	this.disconnectBefore = this.disconnectPrivous; 
	return this;
};
// Classes
var Dormitory  = function(){
	inherit(this,BST);
	this.number			 = -1; 
	this.head   = null;

	this.key = function(){
		return this.number;
	};
	return this;
};

var Student = function(){
	inherit(this,Chain);
	this.No 			= -1;//key
	this.name 			= '';
	this.scoreRecord	= null;
	
	this.key = function(){
		return this.No;
	};
	return this;
};

var Score = function(){
	inherit(this,Chain);
	this.courseName 	= '';
	this.score			= -1;//key
	this.curriculum		= curriculum[000000];
	
	this.key = function(){
		return this.score;
	};
	return this;
};