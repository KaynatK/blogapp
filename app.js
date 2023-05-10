const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require('express-session');
const path = require('path');
const mongoose = require ('mongoose');
const expressLayouts = require('express-ejs-layouts');
const router = express.Router();

// rotues
const articleRouter = require('./routes/article')
const userRouter = require('./routes/login')




const app = express();
//cookie session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


//building the session of cookie

app.get("/",(req,res) => {
    return res.json({
        "message": "Hello World!",
        "success":true
    })
})


//mongoose db connection
mongoose.connect('mongodb://127.0.0.1:27017/miniblog').then(db=>console.log("connected to DB!"))

//engine view
app.use(expressLayouts);
app.set('view engine', 'ejs');


// set of the cookies 
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());
app.use(bodyParser.json());

// route
app.get('/',(req, res)=>{
    res.render('index')
} )

// body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))



//articleRouter
app.use('/article', articleRouter)


//userRouter
app.get('/login',userRouter)



//public folder for css and js
app.use(express.static('public'))



// Port Setting
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log('working on port 8080' )
})