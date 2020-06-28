const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(errorhandler())

mongoose.connect(
    "mongodb://localhost:27017/edx-course-db",
    { useNewUrlParser: true, useUnifiedTopology: true }
)

// define schema
const accountSchema = mongoose.Schema({
    name: String,
    balance: Number
})

// define model
let Account = mongoose.model("account", accountSchema)

// GET all accounts
app.get("/accounts", (req, res) => {
    Account.find({}, (error, accounts) => {
        if (error) console.log(error)
        else {
            let accountsMap = {}
            accounts.forEach(function (acc) {
                accountsMap[acc._id] = acc
            })
            console.log("All accounts: ")
            res.send(accountsMap)
        }
    })
})

// GET by id
app.get("/accounts/:id", (req, res) => {
    Account.findById(req.params.id, (error, accounts) => {
        if(error) console.log(error)
        else {
            res.send(accounts)
        }
    })
})

// POST new account
app.post("/accounts", (req, res) => {
    let newAccount = new Account(req.body)
    newAccount.save((error, results) => {
        if (error) {
            console.error(error)
        } else {
            console.log("Saved: ", results)
            res.send(results)
        }
    })
})

// UPDATE specific ID
app.put("/accounts/:id", (req, res) => {
    let query = { _id: req.params.id }

    Account.findOneAndUpdate(query, req.body, { new: true },
        function (error, result) {
            if (error) console.log(error)
            else {
                console.log(result)
                res.send(result)
            }
        })
})

// DELETE specific ID
app.delete("/accounts/:id", (req, res) => {
    let query = { _id: req.params.id }
    Account.findByIdAndRemove(query, function (error, result) {
        if (error) console.log(error)
        else {
            console.log("Deleting: ", result)
            res.send(result)
        }
    })
})

app.listen(3000) 