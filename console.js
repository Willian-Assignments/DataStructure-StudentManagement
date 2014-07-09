var console =function(){
	var logsArea = null;
	var commandInput = null;
	var promptMark = '';
	var method = '';
	var prefix = '';
	var thisStackPointer = 0;
	var commandStack = new Array();
	var commands = new Object();
	var init = function (){
		method			= "Shell";
		promptMark 		= "\u003e";
		prefix  		= method+promptMark;
		logsArea 		= $('#logs');
		commandInput    = $('#command-line').find('input')[0];
		fixPrefix ();
		bindEvents();
		initCommands();
		
	}
	var initCommands = function(){
		commands.help = shellHelp;
		commands.clear = logsClear;
	}
	var setPrefix = function(){
		prefix = method + promptMark;
	}
	var bindEvents =  function (){
		$(commandInput).keydown(fixPrefix).keyup(fixPrefixAndPressEnter).mousedown(fixPrefix).mouseup(fixPrefix);
	}
	var fixPrefix = function(){
		var string = $(commandInput).val();
		var searchD = string.search(prefix);
		if(searchD != 0){
			if(searchD > 0){
				$(commandInput).val(string.slice(searchD));
			}else{
				$(commandInput).val(prefix+string);
			}
		}
		if(getPositionForInput(commandInput)<prefix.length){
			setInputPosition(commandInput, prefix.length);
		}		
	}
	var fixPrefixAndPressEnter = function(e){
		fixPrefix();
		if ( e.keyCode==13 )
		{
			pressEnter();
		}
		else if( e.keyCode == 38 || e.keyCode == 40)
		{
			commandUpDown(e.keyCode);
		}
	}
	var pressEnter = function(){
		var content = $(commandInput).val();
		$(commandInput).attr('disabled',true);
		$(commandInput).val('');
		if(getPrefixPosition(content) == 0){		
			var command = getCommand(content);
			if(command != ''){
				addLog(content);
				if(commandStack[commandStack.length-1] == ''){commandStack.pop();}
				thisStackPointer = commandStack.length;
				commandStack.push(command);
				execute(command);
				$(logsArea).scrollTop($(logsArea).outerHeight());
				return true;
			}
		}
		executionComplete();
		return false;
	}
	var commandUpDown = function(code){
		var content = $(commandInput).val();
		if(code == 38){
			if(thisStackPointer == (commandStack.length -1) && commandStack[commandStack.length-1] != ''){
				thisStackPointer = commandStack.push(getCommand(content))-1;
			}
			if(thisStackPointer>0){
				thisStackPointer--;
				var command = commandStack[thisStackPointer];
				$(commandInput).val(prefix+command);
			}
		}else if(code == 40){
			if(thisStackPointer<commandStack.length-1){
				thisStackPointer++;
				var command = commandStack[thisStackPointer];
				$(commandInput).val(prefix+command);
			}
		}
	}
	var getPrefixPosition = function(content){
		return content.search(prefix);
	}
	var getCommand = function(content){
		if(getPrefixPosition(content) == 0){
			var command = content.slice(prefix.length);
			if(command.length>0){
				return command;
			}
		}
		return '';
	}
	var execute = function (commandString){
		var commandArray = commandString.split(/\s+/);
		if(commands[commandArray[0]]){
			commands[commandArray[0]](commandArray.shift());
		}else{
			addLog(
				commandArray[0]
				+": Command not found"
				+" , type 'help' to see all commands."
			);
		}
		//alert(commandString);
		executionComplete();
	}
	var executionComplete = function (){
		$(commandInput).val(prefix);
		$(commandInput).attr('disabled',false);
	}
	var addLog = function(logString){
		$(logsArea).append(
			'<div class="log">'
			+logString
			+'</div>'
		);
	}
	var shellHelp = function(){
		addLog("Available Commands:");
		for(var command in commands){
			addLog("&nbsp;&nbsp;&nbsp;"+command.toString());
		}
	}
	var logsClear = function(){
		$(logsArea).empty();
	}
	function getPositionForInput(ctrl){ 
		var CaretPos = 0; 
		if (document.selection) {
			ctrl.focus(); 
			var Sel = document.selection.createRange(); 
			Sel.moveStart('character', -ctrl.value.length); 
			CaretPos = Sel.text.length; 
		}else if(ctrl.selectionStart || ctrl.selectionStart == '0'){
			CaretPos = ctrl.selectionStart; 
		} 
		return (CaretPos); 
	} 
	function setInputPosition(ctrl, pos){ 
		if(ctrl.setSelectionRange){ 
			ctrl.focus(); 
			ctrl.setSelectionRange(pos,pos); 
		} 
		else if (ctrl.createTextRange) { 
			var range = ctrl.createTextRange(); 
			range.collapse(true); 
			range.moveEnd('character', pos); 
			range.moveStart('character', pos); 
			range.select(); 
		} 
	} 
	init();
}
