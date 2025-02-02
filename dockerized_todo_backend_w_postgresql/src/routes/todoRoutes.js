import express from 'express'
import db from '../db.js'
import prisma from './prismaClient.js'

const router = express.Router()

//Get all the todos for the logged in user
router.get('/', async (req,res) => {
    const todods = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(todos)
})

//Create a new todo
router.post('/', async (req,res) => {
    const {task} = req.body

   const todo = await prisma.todo.create({
        data:{
            task,
            userId: req.userId
        }
   })

    res.json(todo)
})

//update a todo, here id is a dynamic query parameter
router.put('/:id', async (req,res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed //forcing it to become the boolean version
        }
    })   

    res.json(updatedTodo)
})

//Delete a todo
router.delete('/:id', async (req,res) => {
    const { id } = req.params
    const userId = req.userId
   
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })

    res.send({message: "Todo deleted"})
})

export default router