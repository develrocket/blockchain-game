const RippleAPI = require('ripple-lib').RippleAPI
const crypto = require("crypto");
var mongojs = require('mongojs');
var bcrypt = require("bcrypt-nodejs");
//var api = new RippleAPI();

module.exports = function(app, passport){
	
var uri = 'mongodb://localhost/xlmchess'; // 'mongodb+srv://mauricedw22:dataMan@cluster1.slfse.mongodb.net/xlmChess?retryWrites=true&w=majority' // process.env.MONGODB_URI || 'mongodb://localhost/xlmChess';
  
var ObjectId = require('mongojs').ObjectID;

var db1 = mongojs(uri, ['users']);

  var api = new RippleAPI({
    server: 'wss://s1.ripple.com' //MAINNET
    //server: 'wss://s.altnet.rippletest.net:51233' //TESTNET 
  });

  app.get('/', function(req, res){
    
      res.render('index.html');
    
  });

  app.get('/login', function(req, res){
    
      res.render('login.html');
    
  });
  
  app.get('/xlmChess', isLoggedIn, function(req, res){
    
      res.render('xlmChess.html');
    
  });

   //Deposit XRP
   app.get('/deposit', isLoggedIn, function(req, res){
    
        res.render('deposit-xrp.html');
    
  });

  //Withdraw XRP
  app.get('/withdraw', isLoggedIn, function(req, res){
    
        res.render('withdraw-xrp.html');
    
  });

  app.get('/test', isLoggedIn, function(req, res){
    
      res.render('test.html');
    
  });

  //SIGNUP route
  app.post('/signup', passport.authenticate('local-signup', {
    
      successRedirect: '/login',
      failureRedirect: '/',
      failureFlash: true
    
  }));
  
  //LOGIN route
  app.post('/login', passport.authenticate('local-login', {
    
       successRedirect: '/xlmChess',
       failureRedirect: '/login',
       failureFlash: true
    
  }));

  //LOGOUT route
  app.get('/logout', function(req, res){
    
        req.logout();
        res.redirect('/login');
    
  });

 //Getting user object into authenticated pages
 app.get('/user', isLoggedIn, function(req, res){
  
      res.send(req.user);
  
 });
  
  //isLoggedIn middleware
  function isLoggedIn(req, res, next){
    
       if(req.isAuthenticated())
         return next();
    
       res.redirect('/login');
    
   }

  app.get('/generateAddress', function(req, res){

     var account = api.generateAddress();
     res.send(account);

  });


  app.get('/checkBalance', isLoggedIn, function(req, res){

    var id = req.user._id.toString();
    var query = {"_id": ObjectId(id)}; //5ccb2b0598f1df14074205ba

    //var query = {"username" : req.user.local.username};
    
       db1.users.findOne(query, function(err, docs){

         if(err) { }

         if(docs){
              api.connect().then(() => {
                var address = docs.local.address;
                console.log(address) 
                api.getAccountInfo(address).then(info => {
                  console.log(info.xrpBalance);
                  res.send(info.xrpBalance);
                }).catch(err => {
                  res.send("0");
                })            
                api.disconnect()
              }).catch()      
        
              //console.log('Deleted this document:' + docs);
              //res.redirect('/data_uploader');

          } else {

            res.send("Can't find user in database: <a href='/xlmChess'>Back</a>")

          }
    
       });
    
    });


  //Withdraw XRP without destination.tag
  app.post('/withdraw', isLoggedIn, function(req, res){
      
      var pub = req.user.local.key0;
      var secret = req.user.local.key1;
      var withdrawPWD = req.user.local.withdrawPassword;

      var password = req.body.withdrawPassword;

      if(bcrypt.compareSync(password, withdrawPWD)){

        var algorithm = 'aes256';
        var key2 = crypto.createDecipher(algorithm, password);
        var str2 = mykey2.update(secret, 'hex', 'utf8') + mykey2.final('utf8');
        //console.log(mystr2);
          
        var sender_address = pub;
        var sender_secret = str2;
        var recipient_address = req.body.address;
        var amount = req.body.amount;
        //var tag = req.body.tag2;

        const instructions = {maxLedgerVersionOffset: 5}
        const currency = 'XRP'
        
        const payment = {
          source: {
            address: sender_address,
            maxAmount: {
              value: amount,
              currency: currency
            }
          },
          destination: {
            address: recipient_address,
            amount: {
              value: amount,
              currency: currency
            }
          }
        }

        api.connect().then(() => {
          //console.log('Connected...')
          api.preparePayment(sender_address, payment, instructions).then(prepared => {
            const {signedTransaction, id} = api.sign(prepared.txJSON, sender_secret)
            console.log(id)
            api.submit(signedTransaction).then(result => {
              console.log(JSON.stringify(result, null, 2));
              res.redirect('/xlmChess');
              //res.send(result.resultMessage + '<BR><BR><a href="/">Back</a>');
            }).catch(err => {
                //console.log(err);
                res.send('Transaction was unsuccessful. Make sure addresses have balances and try again.' + '<BR><BR><a href="/">Back</a>')
              })      
            api.disconnect()  
          })      
          }).catch(console.error)

        } else {
          
            res.send("Withdraw Unsuccessful. Please Try Again. <BR><BR> <a href='/withdraw'>Back</a>");
            
        }
      
  });

  app.post('/donateToTheDeveloper', function(req, res){
    
      var sender_address = req.body.address1;
      var sender_secret = req.body.secret1;
      var recipient_address = 'rUqnEUEknY3fY2rN5w4xezwSdGYJQz4tzt';
      var amount = req.body.amount;

      const instructions = {maxLedgerVersionOffset: 5}
      const currency = 'XRP'
      
      const payment = {
        source: {
          address: sender_address,
          maxAmount: {
            value: amount,
            currency: currency
          }
        },
        destination: {
          address: recipient_address,
          amount: {
            value: amount,
            currency: currency
          }
        }
      }

      api.connect().then(() => {
        //console.log('Connected...')
        api.preparePayment(sender_address, payment, instructions).then(prepared => {
          const {signedTransaction, id} = api.sign(prepared.txJSON, sender_secret)
          console.log(id)
          api.submit(signedTransaction).then(result => {
            console.log(JSON.stringify(result, null, 2));
            res.send(result.resultMessage + '<BR><BR>Thank you very much for your donation! <BR><BR><a href="/">Back</a>');
           })      
           api.disconnect()  
         })      
        }).catch(console.error)
    
  });


};

/*

      var key2 = crypto.createDecipher(algorithm, password);
			var str2 = mykey2.update(mystr, 'hex', 'utf8') + mykey2.final('utf8');
			console.log(mystr2); 

*/


/*
  app.post('/transferRipple', function(req, res){
    
      var sender_address = req.body.address1;
      var sender_secret = req.body.secret1;
      var recipient_address = req.body.address2;
      var amount = req.body.amount;
      var tag = req.body.tag2;

      const instructions = {maxLedgerVersionOffset: 5}
      const currency = 'XRP'
      
      const payment = {
        source: {
          address: sender_address,
          maxAmount: {
            value: amount,
            currency: currency
          }
        },
        destination: {
          address: recipient_address,
          amount: {
            value: amount,
            currency: currency
          },
          tag: tag,
        }
      }

      api.connect().then(() => {
        api.preparePayment(sender_address, payment, instructions).then(prepared => {
          const {signedTransaction, id} = api.sign(prepared.txJSON, sender_secret)
          console.log(id)
          api.submit(signedTransaction).then(result => {
            console.log(JSON.stringify(result, null, 2));
            res.send(result.resultMessage + '<BR><BR><a href="/">Back</a>');
           }).catch(err => {
              res.send('Transaction was unsuccessful. Make sure addresses have balances and try again.' + '<BR><BR><a href="/">Back</a>')
            })      
           api.disconnect()  
         })      
        }).catch(console.error)
    
  }); */

