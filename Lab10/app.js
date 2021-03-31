 
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const data = require('./data/users');
const static = express.static(__dirname + "/public");

const app = express();

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(cookieParser());

app.use(session({
  name: 'AuthCookie',
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.get("/", auth, (req,res) =>{
  if(req.session.user) { //TODO
      printState(true, req);
      res.redirect("/private");
  }else{
      printState(false, req);
      res.render("home/index", { title: "LOGIN", status: false});
  }
  return;
});


  async function checkPass(pass, name){  
    let user = null;
    for(let i = 0; i< data.length; i++){
      if(data[i].username == name) user = data[i];  
    }
    if(await bcrypt.compare(pass, user.hashedPassword) && (name == user.username)){
      console.log("password and username confirmed!");
      return true;
    }
    return false;
}

function getInfo(name){ 
  for(let i = 0; i< data.length; i++){
      if(data[i].username == name){
          return data[i];
      }
  }
}

function printState(authi, req){
  let str = new Date().toUTCString() + " " + req.method + " " + req.originalUrl;
  if(authi){
      str += " (Authenticated User)";
  }else{
      str += " (Non-Authenticated User)";
  }
  console.log(str);
  return;
}

function auth(req, res, next){ //TODO
  if(req.session.user){//TODO
      printState(true, req);
      next();
  }else{
      printState(false, req);
      res.status(403).render("home/index", {title: "User Not Auth", message: "User Needs to Login"});
  }
}

app.post("/login", async (req, res) =>{
    let {username, password} = req.body;
    printState(false, req);
    console.log(username);
    if(!username){
        res.render("home/index", {title: "Missing Login Info", message: "missing username", status: false});
        return;
    }
    if(!password){
        res.render("home/index", {title: "Missing Login Info", message: "missing password", status: false});
        return;
    }
    try{
        if(!( await checkPass(password, username))){//if true then wrong info
            res.render("home/index", {title: "Wrong Info", message: "wrong username or password", status: false});
            return;
        }else{
            req.session.user = getInfo(username); 
            res.cookie("name","AuthCookie");
            res.redirect("/private");
            return;
        }
    }catch(e){
        //nothing
    }
});

app.get("/private", auth, async (req, res) =>{//finish private
  let user = req.session.user;
  if(user){
      printState(true, req);
      res.render("user/private", {title: "Welcome", user});
  }else{
      printState(false, req);
      res.render("home/index", {title: "LOGIN", status: false});
  }
});

app.get("/logout", async (req, res) =>{
  printState(true, req);
  req.session.user = null;
  req.session.destroy();
  res.render("home/index", {title: "LOGOUT", message: "you have been logged out"});
  return;
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});