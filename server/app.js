import express from "express";
const app = express();

app.use(express.json())

import path from "path"

import rateLimit from "express-rate-limit"
//Limiter det gør at der kun må blive sendt et hvis antal request pr. 10 minut
const generalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 80
})

//Resolves the folder
app.use(express.static(path.resolve("../client/dist")))


import session from "express-session"
//måske skal der bruges cookie.path som gør specificerer hvornår man får tildelt en cookie
const maxAgeTime = 1000 * 60 * 60
const sessionName = "cookiename"

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  //Dette spørger om appen kører på https, så hvis den er true = https og false = http
  cookie: {
    name: sessionName,
    secure: false,
    maxAge: maxAgeTime
  }
}))

import cors from "cors"
app.use(cors())


app.use(express.urlencoded({
  extended: true
}))

app.use(express.json());

const PORT = process.env.PORT || 8080;

//Routers
import forgotpasswordrouter from "./routers/forgotPasswordRouter.js"
app.use(forgotpasswordrouter)

import signupLoginRouter from "./routers/signupLoginRouter.js"
app.use(signupLoginRouter)



//Middleware
const redirectLogin = (req, res, next) => {
  if (!req.session.userRole) {
    console.log("jeg er ikke i session")
    res.redirect("/login")
  } else {
    next()
  }
}

const redirectHome = (req, res, next) => {
  if (req.session.userRole) {
    res.redirect("/home")
  } else {
    next()
  }
}

const onlyAdmin = (req, res, next) => {
  if (req.session.userRole !== "ADMIN") {
    res.redirect("/home")
  } else {
    next()
  }
}

//api created to fetch the role on svelte
app.get("/api/isadmin", (req, res) => {
  if (req.session.userRole === "ADMIN") {
    res.send({ role: "ADMIN" })
  } else if (req.session.userRole === "USER") {
    res.send({ role: "USER" })
  } else {
    res.send({ role: "NOT LOGGED IN" })
  }
})

app.get("/api/user", (req, res) => {
  const email = req.session.email
  res.send({email:email})
})

//Restriction for endpoint roles
app.use("/home", generalLimiter, redirectLogin);
app.use("/admin", generalLimiter, onlyAdmin);
app.use("/createnewadmin", generalLimiter, onlyAdmin)
app.use("/login", generalLimiter, redirectHome);
app.use("/signup", generalLimiter, redirectHome);
app.use("/forgotpassword", generalLimiter);


//Logout to destroy session, so that you can login again
app.get("/logout", (req, res, next) => {
  req.session.destroy();
  console.log("Session detroyed")
  res.redirect("/login")
})

//fs is used to read the index.html file in dist folder as a toString, which allows us to use the Router endpoints from svelte
import fs from "fs"
const page = fs.readFileSync("../client/dist/index.html").toString()
app.get(['/home', "/admin", "/login", "/signup", "/forgotpassword", "/createnewadmin"], (req, res) => {
  res.send(page)
});

app.get(("/*"), (req, res) => {
  res.send("<h1>404 page not found</h1>")
});

const server = app.listen(PORT, (error) => {
  if (error) {
    console.log(error)
  }
  console.log("Server is running on port", server.address().port)
})