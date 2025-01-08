import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000   
console.log('hello world')

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})