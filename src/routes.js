import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path';

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query
            const users = database.select('users', {
                name: search,
                email: search,
            })

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email,
            }

            database.insert('users', user)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/):id'),
        handler: (req, res) => {
            const { id } = req.params 
            const { name, email } = req.body

            database.update('users', id, {
                name,
                email,
            })
 
            return res.writeHead(204).end()
        },
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/):id'),
        handler: (req, res) => {
            const { id } = req.params 

            database.delete('users', id)
 
            return res.writeHead(204).end()
        },
    }
]