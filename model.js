//Globals
var inherit = function(subclass,superclass){
	subclass.method = superclass;
	subclass.method();
	delete subclass.method;
};
var globalNodes=[];
//predefines
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
var error = function(str){
	if(console){
		console.error(str);
	}
}
var curriculum = new Array();
curriculum = {
	000000:"未定义",
	201401:"2014学年第1学期",
};
//Abstract Classes
var Node = function(){
	"use strict";
	this.key = null;
	
	//@not used
	this.init = function(){
		globalNodes.push(this);
	};
	this.delloc = function(){
		globalNodes.remove(this);
		delete this;
	};
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
	
	//Constructor
	this.insertNew = function(){
		var chain = new this.constructor;
		this.insert(chain);
		return chain;
	};
	//Delete
	this.deleteAllLefts = function(){
		if(this.lChild !=null){
			this.disconnectLeft();
		}else{
			return;
		}
	};
	this.deleteAllRights = function(){
		if(this.lChild !=null){
			this.disconnectRight();
		}else{
			return;
		}
	};
	//Lookup
	this.findRoot = function(){
		var pointer = this;
		while(pointer.parent!=null){
			pointer = pointer.parent;
		}
		return pointer;
	}
	this.allNodes = function(){
		var rootNode = this.findRoot();
		var stack = [rootNode];
		stack = rootNode.getChildren();
		return stack;
	}
	var getChildren = function(){
		var tampStack = [this];
		if(this.lChild!=null){
			tampStack += this.lChild.getChildren();
		}
		if(this.rChild!=null){
			tampStack += this.rChild.getChildren();
		}
		return tampStack;
	}
	this.exist = function(node){
		var stack = this.allNodes();
		if(stack.indexOf(node)==-1){
			return false;
		}
		return true;
	}
	//Method
	this.insertNode = function(node){
		if(this==node){
			return;
		}else if(this<node){
			if(this.lChild==null){
				this.lChild = node;
				node.parent = this;
			}else{
				this.lChild.insertNode(node);
			}
		}else if(this>node){
			if(this.rChild==null){
				this.rChild = node;
				node.parent = this;
			}else{
				this.rChild.insertNode(node);
			}
		}else{
			error("Error Insert Node:"+this);
		}
	};
	this.disconnectLeft = function(){
		if(this.lChild.parent === this){
			this.lChild.parent = null;
			this.lChild		 = null;
			return true;
		}
		return false;
	};
	this.disconnectRight = function(){
		if(this.rChild.parent === this){
			this.rChild.parent = null;
			this.rChild		 = null;
			return true;
		}
		return false;
	};

	
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
		}else{
			return;
		}
		return this.disconnectNext();
	};
	this.deleteAllPrivous = function(){
		if(this.privous!=null){
			this.privous.deleteAllPrivous();
		}else{
			return;
		}
		return this.disconnectPrivous();
	};
	//Lookup
	this.findBegin = function(){
		if(this.privous!=null){
			return this.privous.findBegin();
		}else{
			return this;
		}
	};
	this.findEnd = function(){
		if(this.next!=null){
			return this.next.findEnd();
		}else{
			return this;
		}
	};
	this.allNodes = function(){
		var pointer = this.findBegin();
		var stack = [];
		stack.push(pointer);
		while(pointer.next!=null){
			stack.push(pointer.next);
			pointer = pointer.next;
		}
		return stack;
	}
	this.exist = function(node){
		var stack = this.allNodes();
		if(stack.indexOf(node)==-1){
			return false;
		}
		return true;
	}
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
			this.next 			 = null;
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
	this.head	 = null;

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