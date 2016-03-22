import mongoose = require("mongoose");
import q 		= require("q");
let Schema		= mongoose.Schema;

let UserSchema  = new Schema({
	FirstName 	: String,
	LastName 	: String,
	Email 		: {type: String, unique : true, required : true},
	Password 	: String,
	CreatedOn 	: {type : Date, default : Date.now()}  ,
	FirebaseToken : String
});

let DatabaseSchemaSellmen = new Schema({
	FirstName :String,
	LastName :String,
	Email:{type:String,unique:true,required:true},
	Password:String,
	CreatedOn:{type:Date,default:Date.now()},
	FirebaseToken : String,
	AdminId :	String 
})

let UserModel = mongoose.model("users", UserSchema);
let UserModelSellsmen = mongoose.model("userssellman", DatabaseSchemaSellmen);

function saveUser(userData){
	let deferred = q.defer();
	let user 	 = new UserModel(userData);
	
	user.save((err, data)=>{
		
		if(err){
			console.log("Error in saving User");
			console.log(err);
			deferred.reject("Error occurred while saving user");
		} else{
			console.log("User Saved Succesfully");
			deferred.resolve(data);
		}		
	});
	
	return deferred.promise; 
}

// function saveSellsmen(userData)
// {
// 		let deffered = q.defer();
// 		let user = new UsersModelSellsmen(userData);
		
// 		user.save((err,userData)=>{
// 			if(err){
// 				console.log("There is an error found while saving user")
// 				console.log("err");
// 				deffered.reject("Error while recording user info");					
// 		}else{
// 			console.log("User Was Saved Successfully");
			
// 			deffered.resolve(userData);
// 		}
// 		})	
// 		return deffered.promise;
// }

function findUser(query){
	let deferred = q.defer();
	UserModel.findOne(query, function(err, record){
			if(err){
				console.log("Error in finding User");
				console.log(err);
  			deferred.reject("Error in finding User"); 
		} else {
				deferred.resolve(record);
			}
		});
	return deferred.promise; 
}

//function getSalesmen(query)
//{
//		let deffered = q.defer();
//		UsersModelSellsmen.find(query,function(err,record){
//			if(err)
//			{
//				deffered.reject("Error in fecthing User");
//			}else{
				
//				deffered.resolve(record);
//			}
//			return deffered.promise;
//		})
			
            
            
//}

export {saveUser, findUser};