const fastify = require("fastify")({
  logger: true,
});
fastify.register(require("@fastify/cors"), {
  origin: true,
});
fastify.register(require("./firstDbConnector"));
fastify.register(require("./firstRoute"));

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
