require('dotenv').config()
import cors from 'cors'
import express from 'express'
import { config } from '~/config'
import { UsersController } from '~/resources/users/users.controller'
import { AdminsController } from '~/resources/users/admins.controller'
import { ExceptionsHandler } from '~/middlewares/exceptions.handler'
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler'

const app = express()

app.use(express.json())

app.use(cors())

// On demande à l'app d'utiliser les routes des contrôleurs pour lancer les services

app.use('/admin', AdminsController)

app.use('/user', UsersController)

app.get('/', (req, res) => res.send('🏠'))

// On redirige l'utilisateur sur une page qui lui indique que la page demandée n'existe pas

app.all('*', UnknownRoutesHandler)

app.use(ExceptionsHandler)

app.listen(config.API_PORT, () => console.log('Silence, ça tourne.'))