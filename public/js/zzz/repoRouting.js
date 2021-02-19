
repo.config(function($routeProvider){

	$routeProvider.when('/',{
		templateUrl: '../../templates/client-profile.html',
		controller: 'repoCTRL'
	}).otherwise({ redirectTo: '/'});

});
