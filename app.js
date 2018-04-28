require('dotenv').config();

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var methodOverride = require("method-override");
var localStrategy = require("passport-local");


var Bank = require("./models/bank");
var bankRoutes = require("./routes/banks");

var url = "mongodb://mohit:mohit@ds161459.mlab.com:61459/fylebankdb";
mongoose.connect(url);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());

app.use(require("express-session")({
    secret: "this will be used for the hash function",
    resave: false,
    saveUninitialized: false
}));


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/banks", bankRoutes);
//Start call
app.get("/" , function(req,res){
    res.render("landing");
});

//ABHY0065001
app.get("/search" , function(req, res){
    if(req.query.ifsc){
        Bank.findOne({ifsc: req.query.ifsc.toUpperCase()},function(err, Bank){
       if(err){
           console.log(err);
       }
       else{
            res.render("banks/ifsc", {bank: Bank});
       }
    });
    }
    else{
        if(req.query.bankname && req.query.city){
            Bank.find({bank_name: req.query.bankname.toUpperCase() , city: req.query.city.toUpperCase()}, function(err , Banks){
                if(err){
                    console.log(err);
                }else{
                    res.render("banks/branches" , {banks: Banks})
                }
            })
            
        }
        else{
            res.redirect("/banks");
        }
    }
    
});

//LISTEN
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelpcamp has started");
});