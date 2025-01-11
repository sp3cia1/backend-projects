import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

//The intercepted request is sent here by the middleware and then the router looks for matching route handler
const router = express.Router()

router.post('/register', (req,res) => {
    console.log("register request made")
})

export default router