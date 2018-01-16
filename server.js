const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

//app.use(express.static(__dirname + "/public"));

//middlewires
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  // fs.appendFile("server.log", log + "\n", err => {
  //   if (err) {
  //     console.log("Unable to append to server.log");
  //   }
  // });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance");
// });

app.use(express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  //res.send("<h1>Hello express!</h1>");
  // res.send({
  //   name: "Ashik",
  //   likes: ["Biking", "Cities"]
  // });

  res.render("home.hbs", {
    pageTitle: "Simple class routine app using express",
    welcome: "Have a nice day!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    message: "This is bad!"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects page",
    wishMessage: "Ashik wants to be a JS ninja"
  });
});

app.get("/routine", (req, res) => {
  res.render("routine.hbs", {
    pageTitle: "Class routine",
    message: "Welcome to our routine page"
  });
});

app.get("/saturday", (req, res) => {
  res.render("saturday.hbs", {
    pageTitle: "You choose Saturday!!!"
  });
});

app.get("/sunday", (req, res) => {
  res.render("sunday.hbs", {
    pageTitle: "You choose Sunday!!!"
  });
});

app.get("/wednesday", (req, res) => {
  res.render("wednesday.hbs", {
    pageTitle: "You choose Wednesday!!!"
  });
});

app.get("/thrusday", (req, res) => {
  res.render("thrusday.hbs", {
    pageTitle: "You choose Thrusday!!!"
  });
});

app.post("/routine", (req, res) => {
  var Day = req.body.day;
  console.log(Day);
  if (Day === "SaturdayValue") {
    res.redirect("/saturday");
  } else if (Day === "SundayValue") {
    res.redirect("/sunday");
  } else if (Day === "WednesdayValue") {
    res.redirect("/wednesday");
  } else if (Day === "ThrusdayValue") {
    res.redirect("/thrusday");
  } else {
    res.redirect("/routine");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});