/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")
const inventoryRoute = require("./routes/inventoryRoute")
const path = require("path")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Middleware
 *************************/
// Static files
app.use(express.static(path.join(__dirname, "public")))

/* ***********************
 * Routes
 *************************/
// Home
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory Routes
app.use("/inv", inventoryRoute)

/* ***********************
 * Error Handling Middleware
 *************************/
// 404 handler
app.use((req, res, next) => {
  res.status(404).render("errors/404", { title: "404 - Page Not Found" })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("errors/500", { title: "500 - Server Error" })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
