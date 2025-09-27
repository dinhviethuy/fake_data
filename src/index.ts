import Fastify from "fastify";
import envConfig from "./config";
import fakeData from "./fake";
import prismaPlugin from "./prisma";

const fastify = Fastify({
  logger: true,
});

fastify.register(prismaPlugin);

fastify.listen({ port: envConfig.PORT }, async (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is running on ${address}`);
  await fakeData(fastify);
  fastify.log.info("Fake data created");
  process.exit(0);
});
