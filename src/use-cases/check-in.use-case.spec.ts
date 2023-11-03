import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in.use-case"

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
    })

    expect(checkIn).toBeTruthy()
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-1",
        userId: "user-1",
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice but in different days", async () => {
    await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
    })

    expect(checkIn).toBeTruthy()
  })
})
