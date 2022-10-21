import { Router } from 'express'
import { UsersService } from '~/resources/users/users.service'
import { BadRequestException, NotFoundException } from '~/utils/exceptions' //TODO virer
import { User } from '~/config'
import { authenticateToken } from '~/middlewares/authenticateToken'


require('dotenv').config()
const bcrypt = require('bcrypt')
const UsersController = Router()


// Route pour la page de profil de l'utilisateur connecté

UsersController.get('/profile', authenticateToken, async (req, res) => {
    return res.status(200).json(await User.findOne({ where: { email: User.email } })) //si ça retourne rien
})

// Route pour l'inscription

UsersController.post('/signup', async (req, res, next) => { //next éventuellement pour catcher dans le middle
    try {
        const salt = await bcrypt.genSalt() //TODO top
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user: object = {
            name: req.body.name,
            firstName: req.body.firstName,
            birthDate: req.body.birthDate,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description
        }

        return res.status(200).json(await service.CreateUser(user))

    } catch(error) {
       // next(error) pour les fonctions asynchrones, vous pouvez taper le middleware d'erreurs globales avec next()
        res.status(500).send("Informations invalides") //TODO je comprends pas le message, si ta base de données est down, ce sont tes informations qui sont invalides ?
    }
})

// Route pour que l'utilisateur se connecte (vérification mdp et token)

UsersController.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } }) //pas catché
    if (user == null) {
        return res.status(400).send('Utilisateur introuvable') // TODO idem, faut tester la donnée d'entrée de la requête pour renvoyer une 400, pas vérifier un résultat lié à cet input
    }
    try {
        return res.status(200).json(await service.LoginUser(req, res, user))
    } catch {
        res.status(500).send('Opération échouée')
    }
})

// Route pour la modification des données de l'utilisateur

UsersController.post('/update', authenticateToken, async (req, res) => {

    const user = {
        email: req.body.email,
    }

    try {
        return res.status(200).json(service.UpdateUser(user)) //hé c'est catché :)
    } catch {
        res.status(500).send('Erreur update')
    }
})

/**
 * Instance de notre service
 */
const service = new UsersService() //TODO cf inversion de dépendance


/**
 * On exporte notre controller pour l'utiliser dans `src/index.ts`
 */
export { UsersController }