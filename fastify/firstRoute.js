async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("cats");

  fastify.get("/cats", async (request, reply) => {
    let result = await collection.find().toArray();
    return { cats: result };
  });

  fastify.get("/cats/:name", async (request, reply) => {
    const result = await collection
      .find({ name: request.params.name })
      .toArray();
    if (result.length === 0) {
      throw new Error("Invalid value");
    }
    reply.send({ cats: result });
  });

  fastify.post("/cats", async (request, reply) => {
    console.log(request);
  });
}

module.exports = routes;
