var app= angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate','mainController','authServices','productControllers'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});

