const router = require('express').Router();
//import axios from 'axios'
require('dotenv').config();

router.get('/', (req, res) => {
    res.render('index', {
        city: null,
        des: null,
        icon: null,
        temp: null

    })
})

router.post('/', async(req, res) => {
    const city = req.body.city
    const fetch = (...args) =>
        import ('node-fetch').then(({ default: fetch }) => fetch(...args));

    const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`

    try {
        fetch(url_api)
            .then(res => res.json())
            .then(data => {
                // const _data = data.json();
                if (data.message === 'city not found') {
                    res.render('index', {
                        city: data.message,
                        des: null,
                        icon: null,
                        temp: null
                        
                    })

                } else {
                    const city = data.name
                    const des = data.weather[0].description
                    const icon = data.weather[0].icon
                    const temp = data.main.temp

                    res.render('index', {
                        city,
                        des,
                        icon,
                        temp
                    })
                }
            })

    } catch (err) {
        res.render('index', {
            city: 'something wrong',
            des: null,
            icon: null,
            temp: null


        })

    }


})

module.exports = router;