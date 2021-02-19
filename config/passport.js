
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js');
const crypto = require("crypto");
const RippleAPI = require('ripple-lib').RippleAPI

module.exports = function(passport){

	var api = new RippleAPI({
    server: 'wss://s1.ripple.com' //MAINNET
    //server: 'wss://s.altnet.rippletest.net:51233' //TESTNET 
  });

  passport.serializeUser(function(user, done){

    done(null, user.id);

  });

  passport.deserializeUser(function(id, done){

     User.findById(id, function(err, user){

	     done(err, user);

	   })

  });

  //Passport Signup logic

  passport.use('local-signup', new LocalStrategy({

    usernameField: 'username',
		passwordField: 'password',
	  passReqToCallback: true

   }, function(req, username, password, done){

    process.nextTick(function(){

	  User.findOne({'local.username':username}, function(err, user){

	    if(err)
		  return done(err);

		if(user){

		  return done(null, false, req.flash('signupMessage', 'That email is taken already.'));

		}else{

			var account = api.generateAddress();
			//console.log(account);

			var algorithm = 'aes256';
			var withdrawPassword = req.body.withdrawPassword;
			var secret = account.secret;

			var key = crypto.createCipher(algorithm, withdrawPassword);
			var str = key.update(secret, 'utf8', 'hex') + key.final('hex');
			//console.log(str); 

			var newUser = new User();
			newUser.local.email = req.body.email;
		  newUser.local.username = username;
			newUser.local.password = newUser.generateHash(password);
			newUser.local.withdrawPassword = newUser.generateHash(withdrawPassword);
			newUser.local.key0 = account.address;
			newUser.local.key1 = str;
			// More user object properties need to be added here.....

		  newUser.save(function(err){

		    if(err)
			  throw err;

			return done(null, newUser);

		  });

		}

	  });

	});

}));

  //Passport Login logic
  passport.use('local-login', new LocalStrategy({

    usernameField: 'username',
	  passwordField: 'password',
	  passReqToCallback: true

    }, function(req, username, password, done){

	  User.findOne({'local.username':username}, function(err, user){

	    if(err)
		  return done(err);

		if(!user)
		  return done(null, false, console.log('User not found in DB!'));

	 	if(!user.validPassword(password))
		  return done(null, false, req.flash('loginMessage', 'Ooops! Wrong password!'));

		return done(null, user);

	  });

	}));

};
