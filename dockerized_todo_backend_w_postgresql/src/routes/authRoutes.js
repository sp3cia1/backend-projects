import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from './prismaClient.js'
import db from '../db.js'

//The intercepted request is sent here by the middleware and then the router looks for matching route handler
const router = express.Router()

router.post('/register', async (req,res) => {
    const {username, password} = req.body
    //save the username and an irrevarsibly encypted password, so even if we get hacked the password in db remain safe

    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)

    //save the new user and hashed password to the db
    try{
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        //now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello :) Add your first todo!`
        
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        //create a token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h'})
        res.json({ token })
    } catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login', async(req,res) => {
    // we get their emial, and we lookup the password associated with that email in the database.
    //but we get it back and we see its encrypted, which means that we cannot compare it to the one the user just used trying to login.
    // so what we can do, is again, one way encrypt the password the user just entered with the same key/algo that was used during registeration to get the saem encrypted password.
    
    const {username, password} = req.body

    try{
        const user = await.prisma.user.findUnique({
            where: {
                username: username
            }
        }) 

        //if we cannot find a user associated with the username return out of the function
        if (!user) { return res.status(404).send({message: "User not found"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        //if the password does not match return out of the function
        if(!passwordIsValid) { return res.sendStatus(401).send({message:"Invalid password"})}

        //if we have successful authentication
        const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
     
})

export default router