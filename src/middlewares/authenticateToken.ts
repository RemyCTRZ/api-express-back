import { Response } from "express"

const jwt = require('jsonwebtoken') //old school
require('dotenv').config()

// Vérifie que le token est valide

export function authenticateToken(req: any, res: Response, next: Function) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    try {
        if (token == null) return res.sendStatus(401) //TODO non 400, si le token n'est pas présent requête mal formée

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: object) => { //TODO why object

            if (err) return res.sendStatus(403) //TODO le verify permet de déterminer si le token est valide, (est ce que le user est connu), si tu ne le connais pas c'est 401, 403 -> tu connais mais tu le laisses pas entrer

            req.user = user

            next()
        })

    } catch (e) { //TODO err ou error plus lisible
        console.log(e)
    }
}