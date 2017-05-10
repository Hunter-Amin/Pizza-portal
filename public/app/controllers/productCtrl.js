angular.module('productControllers',[])
.controller('proCtrl',function(){
	this.pro = function(proData){
		console.log("form submitted");
		console.log(this.proData);
	};
});

