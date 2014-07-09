//Global Method
var inherit = function(subclass,superclass){
	subclass.method = superclass;
	subclass.method();
	delete subclass.method;
}
//predefines
var curriculum = new Array();
curriculum = {
	"000000":"未定义",
	"201401":"2014学年第1学期",
}
//Abstract Classes
var BST = function(){
	this.lChild = null;
	this.rChild = null;
	this.head   = null;
	return this;
}

var Chain = function(){
	this.privous	 = null;
	this.next 		 = null;
	//Construtor
	this.insertNext = function(){
		var chain = new Chain();
		this.connectNext(chain);
		return chain;
	}
	this.insertBefore = function(){
		var chain = new Chain();
		this.connectBefore(chain);
		return chain;
	}
	this.connectNext = function(chain){
		this.next 		= chain;
		chain.privous 	= this;
	}
	this.connectBefore = function(chain){
		chain.next 		= this;
		this.privous 	= chain;
	}
	return this;
}
// Classes
var Dormitory  = function(){
	inherit(this,BST);
	this.number			 = -1;
	return this;
}

var Student = function(){
	inherit(this,Chain);
	this.No 			= -1;
	this.name 			= '';
	this.scoreRecord	= null;
	return this;
}

var Score = function(){
	inherit(this,Chain);
	this.courseName 	= '';
	this.score			= -1;
	this.curriculum		= curriculum[000000];
	return this;
}