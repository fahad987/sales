var express = require("express");
var Firebase = require("firebase");
var ref = new Firebase("https://saylanifahad.firebaseio.com/users");
var UserModel_1 = require("../DbRepo/UserModel");
var router = express.Router();
router.post("/signup", function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.data.FirebaseToken = success.uid;
            UserModel_1.saveUser(req.body.data)
                .then(function (userInstance) {
                res.send({ status: true, user: userInstance });
            }, function (err) {
                res.send({ status: false, message: err });
            });
        }
    });
});
router.post("/login", function (req, res) {
    console.log("On Login In");
    var user = req.body.data;
    UserModel_1.findUser({ Email: user.email })
        .then(function (userInstance) {
        if (!userInstance) {
            res.send("No user found with supplied email");
            return;
        }
        if (userInstance.Password == user.password) {
            res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken });
        }
        else {
            res.send("Wrong Password");
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
});

router.post("/SalesMan", function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.data.FirebaseToken = success.uid;
            UserModel_1.SalesMan(req.body.data)
                .then(function (userInstance) {
                res.send({ status: true, user: userInstance });
            }, function (err) {
                res.send({ status: false, message: err });
            });
        }
    });
});
router.post("/mobileLogin", function (req, res) {
    console.log("On Login In");
    console.log(req.body);
    //console.log("asa");
    //var user = req.body;
    UserModel_1.findUserSalesMan({ Email: req.body.data.email })
        .then(function (userInstance) {
            if (!userInstance) {
                res.send("No user found with supplied email");
                return;
            }
            if (userInstance.Password == req.body.data.password) {
                res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken,AdminId: userInstance.AdminId,Email:userInstance.Email});
                console.log(userInstance);
            }
            else {
                res.send("Wrong Password");
            }
        }, function (err) {
            res.send({ status: false, message: err });
        });
})


router.post("/login", function (req, res) {
    console.log("On Login In");
    var user = req.body.data;
    UserModel_1.findUser({ Email: user.email })
        .then(function (userInstance) {
        if (!userInstance) {
            res.send("No user found with supplied email");
            return;
        }
        if (userInstance.Password == user.password) {
            res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken });
        }
        else {
            res.send("Wrong Password");
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
})
router.post("/placeorder", function (req, res) {
      console.log("order Send");
           UserModel_1.placeOrder(req.body.data)
                .then(function (orders) {
                    res.send({ status: true, orders: orders });
                }, function (err) {
                    res.send({ status: false, message: err });
                });

});

module.exports = router;


