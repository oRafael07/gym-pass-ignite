import { Gym, Prisma } from "@prisma/client"
import { GymsRepository, findManyByNearbyParams } from "../gyms-repository"
import { db } from "@/lib/prisma"

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await db.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }
  async findManyNearby({
    latitude,
    longitude,
  }: findManyByNearbyParams): Promise<Gym[]> {
    const gyms = await db.$queryRaw<Gym[]>`SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`

    return gyms
  }
  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await db.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await db.gym.create({
      data,
    })

    return gym
  }
}
