import express = require("express");
import Firebase = require("firebase");
let ref = new Firebase("https://saylanifahad.firebaseio.com//users");
import {saveUser, findUser} from "../DbRepo/UserModel";


let router = express.Router();


router.post("/signup", (req:express.Request, res:express.Response)=>{

		ref.createUser({
			email    : req.body.data.Email,
  			password : req.body.data.Password
		}, function(err, success){
			if(err){
				res.send(err);
			} else {
				req.body.data.FirebaseToken = success.uid;
				saveUser(req.body.data)
					.then((userInstance)=>{
						res.send({status : true, user : userInstance});
					}, (err)=>{
						res.send({status: false, message : err});
					});
			}
		});
			

		
});

router.post("/SalesMan", (req:express.Request, res:express.Response)=>{

		ref.createUser({
			email    : req.body.data.Email,
  			password : req.body.data.Password
		}, function(err, success){
			if(err){
				res.send(err);
			} else {
				req.body.data.FirebaseToken = success.uid;
				saveUser(req.body.data)
					.then((userInstance)=>{
						res.send({status : true, user : userInstance});
					}, (err)=>{
						res.send({status: false, message : err});
					});
			}
		});
			

		
});


router.post("/login", (req:express.Request, res:express.Response)=>{
		console.log("On Login In");
		
		let user = req.body.data;
		findUser({Email : user.email})
			.then((userInstance)=>{
				if(!userInstance){
					res.send("No user found with supplied email");
					return;
				}
				
				
				if(userInstance.Password == user.password){
					res.send({message : "Logged In successfully", token : userInstance.FirebaseToken});
				} else {
					res.send("Wrong Password");
				}			
				
			}, (err)=>{
				res.send({status: false, message : err});
			});
});
router.post("/SalesMan", (req:express.Request, res:express.Response)=>{

		ref.createUser({
			email    : req.body.data.Email,
  			password : req.body.data.Password
		}, function(err, success){
			if(err){
				res.send(err);
			} else {
				req.body.data.FirebaseToken = success.uid;
				saveUser(req.body.data)
					.then((userInstance)=>{
						res.send({status : true, user : userInstance});
					}, (err)=>{
						res.send({status: false, message : err});
					});
			}
		});
			

		
});
	router.post("/getsalesman",function(req,res){
        console.log("in get salesman");
          var adminUid=req.user.FirebaseToken;
    var orders;
   ref.on("value", function(snapshot) {
    var orders=snapshot.val();
        console.log("with snapshot");
        console.log(orders);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    // UserModel_1.getSalesmen({ AdminId: adminUid })
    //     .then(function (userInstance) {
    //     console.log("in get sellmen"+userInstance);
    //     res.send({ userAll: userInstance,orders:"asad" });
    // });
    
  
   
});
   


module.exports = router;
