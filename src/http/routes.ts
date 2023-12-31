import { FastifyInstance } from "fastify"
import { usersRoutes } from "./controllers/users/routes"
import { gymsRoutes } from "./controllers/gyms/routes"
import { checkInsRoutes } from "./controllers/check-ins/routes"

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(gymsRoutes)
  app.register(checkInsRoutes)
}
