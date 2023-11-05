import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in.use-case"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: "gym-1",
      title: "javascript Academy",
      description: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: "",
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    gymsRepository.items.push({
      id: "gym-1",
      title: "javascript Academy",
      description: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: "",
    })

    const { checkIn } = await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -3.0576514,
      userLongitude: -59.9681565,
    })

    expect(checkIn).toBeTruthy()
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -3.0576514,
      userLongitude: -59.9681565,
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-1",
        userId: "user-1",
        userLatitude: -3.0576514,
        userLongitude: -59.9681565,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice but in different days", async () => {
    await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -3.0576514,
      userLongitude: -59.9681565,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -3.0576514,
      userLongitude: -59.9681565,
    })

    expect(checkIn).toBeTruthy()
  })
})
