import { FastifyInstance } from "fastify"
import { register } from "./controlllers/register.controller"
import { authenticate } from "./controlllers/authenticate.controller"
import { profile } from "./controlllers/profile.controller"
import { verifyJwt } from "./middlewares/verify-jwt"

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register)
  app.post("/sessions", authenticate)

  app.get("/me", { onRequest: [verifyJwt] }, profile)
}
