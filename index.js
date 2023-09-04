if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const passport = require("passport")
const passportLocal = require("passport-local")
const mongoSantize = require("express-mongo-sanitize")
const helmet = require("helmet")

const ExpressError = require("./utils/ExpressError")
const User = require("./models/user")

const monumentRoutes = require("./routes/monuments");
const reviewRoutes = require("./routes/reviews")
const userRoutes = require("./routes/users")
const dbURL = process.env.DB_URL

async function main() {
  await mongoose.connect(dbURL);
  console.log("Mongo is open!");
}

main().catch((err) => console.log(err));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "public")))
app.use(mongoSantize({
    replaceWith: "_"
}))

const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})

store.on("e", function(e) {
    console.log("Session store error", e)
})

const sessionConfig = {
    store: store,
    name: "session",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 604800000,
        maxAge: 604800000,
        httpOnly: true
    },
};
app.use(session(sessionConfig))
app.use(flash())
app.use(helmet())

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com",
    "https://api.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://api.mapbox.com",
    "https://api.tiles.mapbox.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com",
    "https://*.tiles.mapbox.com",
    "https://events.mapbox.com",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            childSrc: ["blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dkticcrbh/",
                "https://images.unsplash.com",
                "https://upload.wikimedia.org",
                " https://cdn-icons-png.flaticon.com"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);



app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => { 
    res.locals.currentUser = req.user
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

app.get("/fakeUser", async (req, res) => {
    const user = new User({email: "xico@xico.com", username:"xico"})
    const newUser = await User.register(user, "totallysafe")
    res.send(newUser)
})

app.use("/", userRoutes);
app.use("/monuments", monumentRoutes)
app.use("/monuments/:id/reviews", reviewRoutes);

app.engine("ejs", ejsMate)

app.get("/", (req, res) => {
    res.render("home")
})

app.all("*", (req, res, next) => { //ONLY RUNS IF NOTHING ELSE RUNS, MUST BE AT THE END
    next(new ExpressError("Page not found", 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if(!err.message) {
        err.message = "Something went wrong :("
    }
    res.status(statusCode).render("errors/error" ,{ err })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})