import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case"

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.body)

  const fetchNearbyUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(201).send({ gyms })
}
