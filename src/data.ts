import type { User } from '~~/types/users'

/**
 * On imagine que ce sont des données reçues de la base de données
 *
 * On spécifie ici que `users` est un tableau contenant des `User`
 */
export const users: User[] = [
  { id: 1, name: 'Cottrez', firstName: 'Rémy', email: 'remycottrez@gmail.com', password: 'test123' }
]