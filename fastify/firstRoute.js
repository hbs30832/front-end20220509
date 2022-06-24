async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("cats");

  fastify.get("/cats", async (request, reply) => {
    let result = await collection.find().toArray();
    return { cats: result };
  });

  fastify.get("/cats/:name", async (request, reply) => {
    console.log("이름 : " + request.params.name);
    const result = await collection
      .find({ name: request.params.name })
      .toArray();
    if (result.length === 0) {
      throw new Error("Invalid value");
    }
    reply.send({ cats: result });
  });

  const catBodyJsonSchema = {
    type: "object",
    required: ["cat"],
    properties: {
      cat: { type: "object" },
    },
  };

  const schema = {
    body: catBodyJsonSchema,
  };

  fastify.post("/cats", { schema }, async (req, reply) => {
    const cat = { ...req.body.cat };
    const result = await collection.insertOne(cat);
    return result;
  });

  fastify.delete("/cats/:id", async (req, reply) => {
    const id = req.params.id;
    console.log("아이디", id);
    const result = await collection.deleteOne({ _id: id });
    return result;
  });
}

module.exports = routes;
