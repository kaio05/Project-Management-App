import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function updateProject(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put(
        '/projects/:projectId', {
            schema: {
                params: z.object({
                    projectId: z.string().uuid(),
                }),
                body: z.object({
                    name: z.string().min(4),
                })
            },
        }, async (request) => {
            const { projectId } = request.params
            const { name } = request.body

            const project = await prisma.project.findUnique({
                where: { id: projectId }
            })

            if (!project) {
                throw new Error('Project not found')
            }

            await prisma.project.update({
                where: { id: projectId },
                data: {
                    name,
                }
            })

            return { projectId: project.id }
        })
}