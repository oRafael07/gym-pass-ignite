import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { InvalidCredencialsError } from "@/use-cases/errors/invalid-credencials-error"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case"

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return res.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredencialsError)
      return res.status(409).send({ message: error.message })

    throw error
  }
}
