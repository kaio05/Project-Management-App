import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function createComponent(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/projects/:projectId/components', {
        // set schema (params and body)
        schema: {
            params: z.object({
                projectId: z.string().uuid(),
            }),
            body: z.object({
                name: z.string().min(4),
                email: z.string().email()
            })
        },
    }, 
    // get params and body from request
    async (request) => {
        const { projectId } = request.params
        const { name, email } = request.body
        
        // get project with id
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        })
        
        if (!project) {
            throw new Error('Project not found')
        }
        // create resource
        const component = await prisma.component.create({
            data: {
                name,
                email,
                project_id: projectId,
            }
        })
        // return resource id
        return { componentId: component.id }
    })
}