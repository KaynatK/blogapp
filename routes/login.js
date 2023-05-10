const express = require('express');
const Router = express.Router();
const User = require('../models/user')

Router.get('/login', (req,res)=>{
    res.render('user/loginpage')
})
//logining checks 
exports.homepage = async function(req, res) {
    // Check if we have the session set.
    if (req.session.user) { 
        // Get the user using the session.
        let user = await User.findById(req.session.user);
        // Render the home page
        res.render("user/loginpage", {
            name: email,
            isLoggedIn: true
        });
    } else {
        // Redirect to the login page
        res.redirect("/user");
    }
}
      
 

module.exports = Router
