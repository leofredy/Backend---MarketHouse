const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()


//Cors garente que apenas esse frontend (site) acesse o backend
app.use(cors(
   /* 
    {
        origin: 'www.sitePronto.com.br'
    }
    */
))

app.use(express.json())
app.use(routes)
/**
 * Node:  3333
 * React: 3000
 */
app.listen(process.env.PORT || 3333)
