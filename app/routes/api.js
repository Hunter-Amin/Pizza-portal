var User = require('../models/user');
var Product = require('../models/product');
var jwt = require('jsonwebtoken');
var secret = 'Amin';
//for sending form data

module.exports = function(router){
	
	//User Registration Route
router.post('/user', function(req, res){
	
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	if(req.body.username == null || req.body.username == " " || req.body.email == null || req.body.email == " " ||req.body.password == null || req.body.password == " " )
	{
       res.json({ success: false, message:'Enseure Username , Email and Password Provided'});	   
	}
	else
	{
		user.save(function(err){
		if(err) {
			res.json({ success:false, message:'Username And Email Alerady Exist'});
		} 
		else{
			res.json({success:true, message:"User Created !!!!!!!!"});
		}
	       });
	}
});

router.post('/product', function(req, res){
	var product= new Product();

	product.productname = req.body.productname;
	product.prize = req.body.prize;
	//product.language = req.body.language;
	
	
	product.save(function(err){
	if(err){
		res.send(err);
	}
	else{
		res.send('Product Created');
	}
	});
	
	
});

//User Login Route
//localhost:8000/api/authenticate
router.post('/authenticate', function(req, res){
	
	User.findOne({ username: req.body.username}).select('email username password').exec(function(err, user){
		if(err) throw err;
		if(!user)
		{
			res.json({ success:false , message:'Could not Authenticate User'});
		}
		else if(user){
			if(req.body.password){
				var validPassword = user.comparePassword(req.body.password);
			}
			else{
				res.json({ success:false , message : "No Password Provided"});
			}
			if(!validPassword){
				res.json({ success:false , message:'Could Not Authenticate Password'});
			}
			else{
				var token = jwt.sign({ username: user.username, email:user.email}, secret,{ expiresIn: '1h' });
				res.json({ success:true , message: 'User Authenticated!',token :token });
			}
			
		}
	});
});

   router.use(function(req,res,next){
	   var token = req.body.token || req.body.query || req.headers['x-access-token'];
	   if(token){
		   //verify token
		   jwt.verify(token, secret, function(err, decoded) {
            if(err) { res.json({ success: false, message:'Invalid Token'});
			}
			else {
				req.decoded = decoded;
				next();
				
			}
});
	   }
	   else{
		   res.json({ success: false, message:'No Token Provided' });
	   }
   });
   router.post('/me',function(req,res){
	  res.send(req.decoded); 
   });
   return router;
}


