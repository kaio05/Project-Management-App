import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getComponents(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/projects/:projectId/components', {
            schema: {
                params: z.object({
                    projectId: z.string().uuid(),
                }),
            },
        }, async (request) => {
            const { projectId } = request.params

            const project = await prisma.project.findUnique({
                where: { id: projectId },
                include: {
                    components: {}
                }
            })

            if (!project) {
                throw new Error('Project not found')
            }

            return { components: project.components }
        })
}