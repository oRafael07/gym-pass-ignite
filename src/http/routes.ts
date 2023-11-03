import { FastifyInstance } from "fastify"
import { register } from "./controlllers/register.controller"
import { authenticate } from "./controlllers/authenticate.controller"

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register)
  app.post("/sessions", authenticate)
}
