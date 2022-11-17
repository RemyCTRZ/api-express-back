import { Router } from 'express'
import { AdminsService } from '~/resources/users/admins.service'
import { User } from '~/config'
import { authenticateToken } from '~/middlewares/authenticateToken'

require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AdminsController = Router()
const service = new AdminsService()

// Route pour la connexion de l'admin

AdminsController.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (user == null) {
        return res.status(400).send('Utilisateur introuvable')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const userEmail = req.body.email
            const accessToken = generateAccessToken(userEmail)

            function generateAccessToken(user: object) {
                return jwt.sign({ email: user }, process.env.ACCESS_TOKEN_SECRET)
            }

            return res.status(200).json({ accessToken: accessToken })
        } else {
            res.send('Connexion refusée')
        }
    } catch {
        res.status(500).send('Opération échouée')
    }
})

// Route pour récupérer la liste des utilisateurs

AdminsController.get('/', authenticateToken, async (req, res) => {
    return res
        .status(200)
        .json(await service.FindAll())
})

// Route pour récupérer les informations d'un utilisateur en particulier via son ID

AdminsController.get('/:id', authenticateToken, async (req, res) => {
    const id: number = Number(req.params.id)
    return res
        .status(200)
        .json(await service.FindOne(id))
})

// Route pour modifier les informations d'un utilisateur

AdminsController.post('/update', authenticateToken, async (req, res) => {

    const user = {
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
        description: req.body.description
    }

    await User.update({ user }, { where: { email: User.email } })
})

// Route pour supprimer un utilisateur via son ID

AdminsController.post('/delete', authenticateToken, (req, res) => {

    const id = req.body.id

    return res
        .status(200)
        .json(service.DeleteUser(id))

})

export { AdminsController };