import Knex from "knex";
import config from "../../knexfile.js";

const env = process.env.NODE_ENV || "development";

const knex = Knex(config[env]);

export default async function routes(fastify, options) {
  fastify.get("/ping", async (request, reply) => {
    return "pong\n";
  });

  fastify.get("/emails", async (request) => {
    const { search } = request.query;
    const query = knex("emails").select("*");

    if (search && search.trim().length > 0) {
      const term = `%${search.toLowerCase()}%`;

      query.where((qb) => {
        qb.whereRaw("LOWER(`to`) LIKE ?", [term])
          .orWhereRaw("LOWER(cc) LIKE ?", [term])
          .orWhereRaw("LOWER(bcc) LIKE ?", [term])
          .orWhereRaw("LOWER(subject) LIKE ?", [term])
          .orWhereRaw("LOWER(body) LIKE ?", [term]);
      });
    }

    query.orderBy("created_at", "desc");

    return await query;
  });

  fastify.post("/emails", (request) => {
    return knex("emails").insert(request.body);
  });
}
