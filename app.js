const express = require('express')
const app = express();

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
    // Import Route
const weatherRoute = require('./routes/weather')

// Use view engine
app.set('view engine', 'ejs')

//MiddleWare route
app.use('/', weatherRoute)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`))