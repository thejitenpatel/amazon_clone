const express = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const authRouter = express.Router()

authRouter.post('/api/signup', async (req, res) => { 
    try {
        const { name, email, password } = req.body

        console.log(name, email, password);

        const existingUser = await User.findOne({ email })
        
        if (existingUser) {
            return res.status(400).json({msg: "User with same email already exists!"})
        }
            
        const hashedPassword = await bcryptjs.hash(password, 8)

        let user = new User({
            name,
            email,
            password: hashedPassword,
        })

        user = await user.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
})

module.exports = authRouter