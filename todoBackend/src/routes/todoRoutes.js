import express from 'express'
import db from '../db.js'

const router = express.Router()

//Get all the todos for the logged in user
router.get('/', (req,res) => {

})

//Create a new todo
router.post('/', (req,res) => {

})

//update a todo, here id is a dynamic query parameter
router.put('/:id', (req,res) => {

})

//Delete a todo
router.delete('/:id', (req,res) => {

})

export default router