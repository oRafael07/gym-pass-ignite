import { CheckIn, Prisma } from "@prisma/client"
import { CheckInsRepository } from "../check-ins-repository"
import { db } from "@/lib/prisma"
import dayjs from "dayjs"

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await db.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await db.checkIn.create({
      data,
    })

    return checkIn
  }
  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await db.checkIn.findMany({
      where: {
        userId: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }
  async countByUserId(userId: string): Promise<number> {
    const count = await db.checkIn.count({
      where: {
        userId: userId,
      },
    })

    return count
  }
  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date")
    const endOfTheDay = dayjs(date).endOf("date")

    const checkIn = await db.checkIn.findFirst({
      where: {
        userId: userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }
  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await db.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}
