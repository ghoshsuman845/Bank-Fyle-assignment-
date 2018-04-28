var express = require("express");
var router = express.Router();
//var Bank = require("../models/bank");
//var middleware = require("../middleware/index.js");


router.get("/" , function(req,res){
    res.render("banks/index" , {currentUser: req.user});
});


module.exports = router;