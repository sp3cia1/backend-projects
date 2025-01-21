import express from 'express'
import db from '../db.js'

const router = express.Router()

//Get all the todos for the logged in user
router.get('/', (req,res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId) //retreives all the matching rows

    res.json(todos)
})

//Create a new todo
router.post('/', (req,res) => {
    const { task } = req.body
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`)

    const result = insertTodo.run(req.userId, task)

    res.json({id: result.lastInsertRowId, task, completed: 0})
})

//update a todo, here id is a dynamic query parameter
router.put('/:id', (req,res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`)

    updatedTodo.run(completed, id)

    res.json({message: "Todo Completed"})
})

//Delete a todo
router.delete('/:id', (req,res) => {
    const { id } = req.params
    const userId = req.userId
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
    deleteTodo.run(id, userId) 
    res.send({message: "Todo deleted"})
})

export default router