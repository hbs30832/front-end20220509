const fastifyPlugin = require("fastify-plugin");

async function dbConnector(fastify, options) {
  fastify.register(require("@fastify/mongodb"), {
    url: "mongodb+srv://hbs9312:12341234@cluster0.rpv0n.mongodb.net/cats?retryWrites=true&w=majority",
  });
}

module.exports = fastifyPlugin(dbConnector);
