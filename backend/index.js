const express = require('express')
const cors = require('cors')
const app = express();
const port = 8080;

const db = require('./config/mongoose')

app.use(express.json());
// 1 way
app.use(cors())
// 2 way
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )

app.get('/', (req, res) => {
    return res.send('<h1>Welcome to mern app</h1>')
})


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is up and running on port : ${port}`)
})