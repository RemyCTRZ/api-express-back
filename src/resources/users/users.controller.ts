import { Router } from 'express'
import { UsersService } from '~/resources/users/users.service'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'
/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
const UsersController = Router()

/**
 * Instance de notre service
 */
const service = new UsersService()



/**
 * On exporte notre controller pour l'utiliser dans `src/index.ts`
 */
export { UsersController }