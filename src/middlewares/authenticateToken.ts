import { Response } from "express"

const jwt = require('jsonwebtoken')
require('dotenv').config()

// Vérifie que le token est valide

export function authenticateToken(req: any, res: Response, next: Function) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    try {
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: object) => {

            if (err) return res.sendStatus(403)

            req.user = user

            next()
        })

    } catch (e) {
        console.log(e)
    }
}