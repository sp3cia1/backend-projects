import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000  

//Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
//Get the directory name from the file path
const __dirname = dirname(__filename)

//Middleware
app.use(express.json())

//Tells express to serve all files from the public folder as staic assets/file. Any requests for the css file from the html file will be resolved to the public directory.
app.use(express.static(path.join(__dirname, '../public'), { index:false }))
//(Note :- this middleware serves all the file in public (if index:false is removed) whenever any request is made so it can also serves index.html but it will be sent "as is" with no extra logic so we send it though app.get('/') with res.sendFile(...) to include additional logic or checks before sending the file. )

//Serving up the HTML file from the ../public (becuase public is a level above the current directory) directory
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

//Routes
//Client sends the request to '/auth' endpoint which is intercepted by this middleware and it forwards the request to the router in authRoutes.js which was imported as authRoutes here
app.use('/auth',authRoutes) 

//middleware for routing todo requests
app.use('/todos',todoRoutes) 

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})