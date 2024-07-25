import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from './env'
import cors from '@fastify/cors'
import { createProject } from './routes/create-project'
import { getProjectDetails } from './routes/get-project-details';
import { createResource } from './routes/create-resource';
import { getResources } from './routes/get-resources';
import { createComponent } from './routes/create-component';
import { getComponents } from './routes/get-components';
import { updateProject } from './routes/update-project';
import { getProjects } from './routes/get-projects';

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, { 
    origin: '*'
})

app.register(createProject)
app.register(getProjectDetails)
app.register(createResource)
app.register(getResources)
app.register(createComponent)
app.register(getComponents)
app.register(updateProject)
app.register(getProjects)

app.listen({ port: env.PORT }, () => {
    console.log(`Server listening at ${env.PORT}`)
})