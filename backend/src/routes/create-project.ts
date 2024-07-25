import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createProject(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/projects', {
        schema: {
            body: z.object({
                name: z.string().min(4),
            })
        },
    }, async (request) => {
        const { name } = request.body

        const project = await prisma.project.create({
            data: {
                name
            }
        })

        return { projectId: project.id }
    })
}