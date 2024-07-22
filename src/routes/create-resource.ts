import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function createResource(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/projects/:projectId/resources', {
        // set schema (params and body)
        schema: {
            params: z.object({
                projectId: z.string().uuid(),
            }),
            body: z.object({
                name: z.string().min(4),
                amount: z.coerce.number().int()
            })
        },
    }, 
    // get params and body from request
    async (request) => {
        const { projectId } = request.params
        const { name, amount } = request.body
        
        // get project with id
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        })
        
        if (!project) {
            throw new Error('Project not found')
        }
        // create resource
        const resource = await prisma.resource.create({
            data: {
                name,
                amount,
                project_id: projectId,
            }
        })
        // return resource id
        return { resourceId: resource.id }
    })
}