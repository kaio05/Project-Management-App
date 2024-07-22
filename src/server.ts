import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from './env'
import cors from '@fastify/cors'
import { createProject } from './routes/create-project'
import { getProjectDetails } from './routes/get-project-details';

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, { 
    origin: '*'
})

app.register(createProject)
app.register(getProjectDetails)

app.listen({ port: env.PORT }, () => {
    console.log(`Server listening at ${env.PORT}`)
})