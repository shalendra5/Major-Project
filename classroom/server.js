const express = require("express");
const app = express();
const users = require("./routes/users");
const posts = require("./routes/posts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.use(flash());

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "views"));

app.use(cookieParser("secretcode"));

app.use(session ({
    secret: "mysupersecretstring",
    resave : false,
    saveUninitialized : true,
}));
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/test", (req, res)=>{
    res.send("Test succesful!");
});

app.get("/reqcount", (req, res)=>{
    if(req.session.count){
        req.session.count ++;
    }else{
        req.session.count = 1;
    }
    res.send(`You send a request ${req.session.count} times`);
});

app.get("/register", (req, res)=>{
    let {name = "anonymouse"}= req.query;
    req.session.name = name;
    if(name === "anonymouse"){
        req.flash("error","User not registered!");
    }else{
        req.flash("success", "User registered Successfully!");
    }
    res.redirect("/hello");
});

app.get("/hello", (req , res)=>{
    res.render("page.ejs", {name : req.session.name});
});

// app.get("/getsignedcookie", (req, res)=>{
//     res.cookie("color", "red", {signed : true});
//     res.send("done!");
// });

// app.get("/verify", (req, res)=>{
//     console.log(req.signedCookies);
//     res.send(req.signedCookies);
// });

// app.get("/setcookies", (req, res)=>{
//     // console.dir(req.cookies);
//     res.cookie("greet","namaste");
//     res.cookie("origin","India");
//     res.send("We send you a cookie!");
// });

// app.get("/getcookies", (req, res)=>{
//     console.dir(req.cookies);
//     res.send("got the cookies!")
// });

// app.get("/greet", (req, res)=>{
//     let {name = "anonymous"}= req.cookies;
//     res.send(`Hi, ${name}`);
// });

// app.get("/",(req, res)=>{
//     res.send("Hi, I am a root.");
// });

// app.use("/users", users);
// app.use("/posts",posts);

app.listen(3000, ()=>{
    console.log("Server is listening to 3000");
});