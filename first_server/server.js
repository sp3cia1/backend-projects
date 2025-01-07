// the address of this server is http://localhost:8383
//IP
const express = require('express')
const app = express()
PORT = 8383

let data = ["james"]

//Middleware :- every req and res has to go through middleware app.use()
app.use(express.json())

//ENDPOINT = HTTP VERBS & ROUTES (or paths)
// the method informs the nature of request and the route is a further subdirectory(basically we direct the request to the body of the code to respond appropiately, and these locations or routes are called endpoints)

//Type 1 - Website endpoints (these endpoints are for sending back html and they typically come when a user enters a url in a browser)
app.get('/', (req, res) => {
    //this is endpoint 1
    console.log("WE at a endpoint", req.method)
    res.send(`
        <body style="background:pink;color:blue">
        <h1>DATA</h1>
            <p>${JSON.stringify(data)}</p>
            
        </body>    
    `)
})

app.get('/dashboard', (req,res) => {
    //this is endpoint 2
    res.send('<h1>dashboard</h1>')
})

//Type 2 - API endpoints (non-visual)\

//CRUD-Method : Create-post, Read-get, Update-put and Delete-delete

app.get('/api/data', (req, res) => {
    console.log("This is for data")
    res.send(data)
})

app.post('/api/data', (req, res) => {
    //someone wants to create a user( for example when they click a sign up button)
    // the user clicks the sign up button entering their credentials, and their browser is wired up to send out a network request to the server to handle that action
    const newEntry = req.body
    console.log(newEntry)
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req,res) => {
    data.pop()
    console.log('we deletd the element off the end')
    res.sendStatus(203)
})

app.listen(PORT, () => console.log(`server runnning on ${PORT}`))