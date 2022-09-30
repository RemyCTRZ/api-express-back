require('dotenv').config()
import cors from 'cors'
import express from 'express'
import { config } from '~/config'
import { UsersController } from '~/resources/users/users.controller'
import { ExceptionsHandler } from '~/middlewares/exceptions.handler'
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler'

const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

app.use(cors())

app.use('/users', UsersController)

app.get('/', (req, res) => res.send('🏠'))

app.all('*', UnknownRoutesHandler)

app.use(ExceptionsHandler)

app.listen(config.API_PORT, () => console.log('Silence, ça tourne.'))