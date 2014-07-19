Ext.application({
	name   : 'StudentManagement',
	launch : function() {
		var title = {
	            xtype: 'box',
	            id: 'header',
	            region: 'north',
	            style		: 'color:white',
	            html: '<h1>学生信息管理</h1>',
	            height: 50,
	            margins: '0 0 0 20',
	        };
		var toolbar = {
	            xtype: 'toolbar',
	            id: 'toolbar',
	            region: 'north',
	            items : [
	            	{
		            	text: '+',
				        url: '#',
/*
				        baseParams: {
				            q: 'html+anchor+tag'
				        },
*/
				        tooltip: '按钮1'
	            	}
	            ]
	        };

	    var contentPanel = {
	            id: 'content-panel',
	            region: 'center', 
	            layout: 'card',
	            margins: '2 5 205 0',
	            activeItem: 0,
	            border: false,
	            html: '内容'
	        };
	    
		var treePanel = {
				margins: '0 0 205 0',
				xtype		 :'panel',
				width        : 250,
				region		 : 'west',
				collapsible	 : false,
	            title        : '所有寝室',
	            html         : '',
	            split: true
	    };
		
		Ext.create('Ext.container.Viewport', {
	        layout			: 'border',
	        title			: '学生管理',
	        items			: [
	            title,
	            toolbar,
	        	treePanel,
	            contentPanel
	        ]
	    });
	        

    }
});
var refresh = function(){
	var 
}
Ext.onready(function(){
	
	
	
});