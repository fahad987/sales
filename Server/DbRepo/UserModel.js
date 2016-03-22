var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: { type: String, unique: true, required: true },
    Password: String,
    CreatedOn: { type: Date, default: Date.now() },
    FirebaseToken: String
});
var DatabaseSchemaSellmen = new Schema({
    FirstName: String,
    LastName: String,
    Email: { type: String, unique: true, required: true },
    Password: String,
    CreatedOn: { type: Date, default: Date.now() },
    FirebaseToken: String,
    AdminId: String
});
var DatabaseSchemaOrders = new Schema({
    ClientName:String,
    OrderName: String,
    Quantity:Number,
    Email: {type: String, unique: true, required: true},
    CreatedOn: {type: Date, default: Date.now() },
    SellmanId: String
});
var UserModel = mongoose.model("users", UserSchema);
var UsersModelSellsmen = mongoose.model("usersSellmens", DatabaseSchemaSellmen);
var OrdersModel =mongoose.model("orders",DatabaseSchemaOrders)
function saveUser(userProps) {
    var deferred = q.defer();
    var user = new UserModel(userProps);
    user.save(function (err, data) {
        if (err) {
            console.log("Error in saving User");
            console.log(err);
            deferred.reject("Error occurred while saving user");
        }
        else {
            console.log("User Saved Succesfully");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
exports.saveUser = saveUser;
var UserModel = mongoose.model("users", UserSchema);
function saveUser(userProps) {
    var deferred = q.defer();
    var user = new UserModel(userProps);
    user.save(function (err, data) {
        if (err) {
            console.log("Error in saving User");
            console.log(err);
            deferred.reject("Error occurred while saving user");
        }
        else {
            console.log("User Saved Succesfully");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
exports.saveUser = saveUser;

function findUser(query) {
    var deferred = q.defer();
    UserModel
        .findOne(query, function (err, record) {
        if (err) {
            console.log("Error in finding User");
            console.log(err);
            deferred.reject("Error in finding User");
        }
        else {
            deferred.resolve(record);
        }
    });
    return deferred.promise;
}
exports.findUser = findUser;

//var UserModelSellsmen = mongoose.model("usersSellmens", UserSchema);
//var OrdersModel = mongoose.model("orders",UserSchema)
//function saveAdminUser(userData) {
   // var deffered = q.defer();
    //var user = new UsersModelAdmin(userData);
    //user.save(function (err, userData) {
        //if (err) {
           // console.log("There is an error found while saving user");

         //   deffered.reject("Error while recording user info");
       // }
        //else {
          //  console.log("User Was Saved Successfully");
        //    deffered.resolve(userData);
      //  }
    //});
  //  return deffered.promise;
//}
//exports.saveAdminUser = saveAdminUser;
function saveSellsmen(userData) {
   var deffered = q.defer();
   var user = new UsersModelSellsmen(userData);
    user.save(function (err, userData) {
        if (err) {
            console.log("There is an error found while saving user");
           console.log("err");
           deffered.reject("Error while recording user info");
       }
        else {
           console.log("User Was Saved Successfully");
           deffered.resolve(userData);
       }
    });
   return deffered.promise;
};
exports.saveSellsmen=saveSellsmen;


//exports. placeOrder= placeOrder;