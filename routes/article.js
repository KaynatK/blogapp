const express = require('express');
const Router = express.Router();
const Article = require('../models/article')

Router.get('/new', (req,res)=>{
    res.render('article/new')
})

Router.get('/', (req,res)=>{
    //get all the articles
    let output
    (async ()=>{
        output = await Article.find({})
        console.log(...output)
        res.render("posts", {data:output})
    })();
    // console.log(output);
    
})



Router.get('/:id', (req,res)=>{
    res.render('index')
    //get the article matching the ID
})


function middleware(req,res,next) {
    //TODO modify this middleware so it checks that there is a real session. 
    // I will have to write something that creates a user session
    if(false){
        return res.redirect('/login')
    }
    next()
}


Router.post('/', middleware, (req,res)=>{
    const article = new Article({
        title:req.body.title,
        description:req.body.description,
        Info:req.body.Info, 
        author:req.body.author
    
    })
    console.log("Posted data to server. processing")
    
    let output; 
    // ()() IIFE Immediately invoked Function Expression
    //The asynchronous function is executed inside the Immediately invoked Function Expression
    (async ()=>{
        output = await article.save()
    })()

    

    res.redirect('/article/')

})


module.exports = Router;
