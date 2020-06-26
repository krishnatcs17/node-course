const mongodb = require('mongodb')
const logger = require('morgan')
const express = require('express')
const async = require('async')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const customers = require('./m3-customer-data.json')
const customersAddress = require('./m3-customer-address-data.json')

const url = 'mongodb://localhost:27017/'
let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))

let tasks = []
const limit = parseInt(process.argv[2], 10) || 1000 

mongodb.MongoClient.connect(url,
    { useUnifiedTopology: true },
    (error, client) =>{
    if(error) return process.exit(1)

    const db = client.db('edx-course-db')
    console.log("Connected to the server..");    

    customers.forEach((value, index, arr) => {
        customers[index] = Object.assign(value, customersAddress[index])

        if(index % limit == 0) {
            let start = index
            let end = (start + limit > customers.length) ? customers.length-1 : start+limit-1

            tasks.push((callback) => {
                console.log(`Proccessing ${start} to ${end} records..`);
                db.collection('customers').insertMany(customers.slice(start, end), (error, results) => {
                    callback(error, results)
                })
            })
        }
    }) 

    async.parallel(tasks, (error, results) => {
        if (error) console.error(error)

        // console.log(results)
        client.close()
    })

    app.use(errorHandler())
})