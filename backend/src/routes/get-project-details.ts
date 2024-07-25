import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getProjectDetails(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/projects/:projectId', {
        schema: {
            params: z.object({
                projectId: z.string().uuid(),
            }),
        },
    }, async (request) => {
        const { projectId } = request.params

        const project = await prisma.project.findUnique({
            select: {
                id: true,
                name: true,
            },
            where: { id: projectId },
        })

        if (!project) {
            throw new Error('Project not found')
        }


        return { project }
    })
}