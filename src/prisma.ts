import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import FastifyPlugin from "fastify-plugin";

const prisma = new PrismaClient();

const prismaPlugin = (fastify: FastifyInstance) => {
  fastify.decorate("prisma", prisma);
  fastify.addHook("onClose", async (app) => {
    await app.prisma.$disconnect();
  });
};

export default FastifyPlugin(prismaPlugin);
