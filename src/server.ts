import fastify from 'fastify'
import { env } from './env'
import cors from '@fastify/cors'

const app = fastify()

app.register(cors, { 
    origin: '*'
})

app.get('/', (req, reply) => {
    reply.send('hello world')
  })

app.listen({ port: env.PORT }, () => {
    console.log(`Server listening at ${env.PORT}`)
})