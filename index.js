require('dotenv').config()
const express = require('express')
const server = express()
const cors = require('cors')

const port = process.env.PORT || 9000
const Users = require('./usersData')

server.use(express.json())
server.use(cors())



server.get('/api/users', (req, res) => {
    res.status(200).json(Users)
})

server.post('/api/login', (req, res) => {
    const { username, password } = req.body

    if(!username || !password){
        res.status(404).json({message: "Name and Password required"})
    } else {
        for(let i = 0; i < Users.length; i++){
            if(Users[i].username === username & Users[i].password === password){
                console.log(Users[i].username)
                res.status(200).send(`welcome ${username}`)
            } else if(i === Users.length -1){
                res.status(404).send('Wrong login info')
            }
        } 
    }
    
})

server.post('/api/register', async (req, res) => {
    const { username, password } = req.body
    const userData = await req.body

    if(!username || !password){
        res.status(404).json({message: "Name and Password required"})
    } else {
        res.status(201).json(userData) 
        Users.push(userData)
    }
})


server.use('*', (req, res) => {
    res.send(`<h1>Hello There !!<h1/>`)
})

server.use((err, req, res, next) => {
    res.status(500).json({
        mesage: err.message,
        stack: err.stack
    })
})

server.listen(port, () => {
    console.log(`API active on http://localhost:${port}`)
})