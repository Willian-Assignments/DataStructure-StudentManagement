Ext.application({
	name   : 'StudentManagement',
	launch : function() {
	    var contentPanel = {
	            id: 'content-panel',
	            region: 'center', 
	            layout: 'card',
	            margins: '2 5 5 0',
	            activeItem: 0,
	            border: false,
	            html: '内容'
	        };
	    
		var treePanel = {
				xtype		:'panel',
				width        : 250,
				region: 'west',
				collapsible: true,
	            title        : '所有寝室',
	            html         : '',
	            split: true
	    };
		
		Ext.create('Ext.Viewport', {
	        layout: 'border',
	        title: '学生管理',
	        items: [{
	            xtype: 'box',
	            id: 'header',
	            region: 'north',
	            html: '<h1> 学生管理</h1>',
	            height: 50
	        },treePanel,
//	        },{
//	            layout: 'border',
//	            id: 'layout-browser',
//	            region:'west',
//	            border: false,
//	            split:true,
//	            margins: '2 0 5 5',
//	            width: 290,
//	            minSize: 100,
//	            maxSize: 500,
//	            items: [treePanel]
//	        },
	            contentPanel
	        ]
	    });
    }
});