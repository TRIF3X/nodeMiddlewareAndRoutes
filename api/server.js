const express = require('express');


const server = express();

const productRouter = require('../products/ProductRouter.js')
const configureMiddleware = require('../config/config.js')


//configure middleware
// ORDER MATTERS! executes top to bottom
configureMiddleware(server)

//custom middleware

function gateKeeper(req, res, next) {
    if (req.query.pass === 'melon') {
        console.log('welcome')

        
        req.welcomeMessage = 'welcome to the mine of Moria'
        next();
    } else {
        res.send('You shall not pass!')
    }
}

server.use(gateKeeper)


//configure endpoints (route handlers are middleware!!)
server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
})

//can also use middleware in the endpoint

server.get('/secret', gateKeeper, (req, res) => {
    res.send(req.welcomeMessage)
})

server.use('/api/products', productRouter)



module.exports = server;