import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { ValidateCheckInUseCase } from "./validate-check-in.use-case"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe("Validate Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it("should be able to validate check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gymId: "gym-01",
      userId: "user-01",
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validatedAt).toEqual(expect.any(Date))
  })

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "any-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
