const express = require('express')
const path = require('path')
const api = require('./server/routes/api.js')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)

const port = 3000
app.listen(port, () => console.log('Listening on', port))