import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { GetUserMetricsUseCase } from "./get-user-metrics.use-case"

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)

    // await gymsRepository.create({
    //   id: "gym-1",
    //   title: "javascript Academy",
    //   description: null,
    //   latitude: -3.0576514,
    //   longitude: -59.9681565,
    //   phone: null,
    // })
  })

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gymId: "gym-01",
      userId: "user-01",
    })

    await checkInsRepository.create({
      gymId: "gym-02",
      userId: "user-01",
    })

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
      page: 1,
    })

    expect(checkInsCount).toEqual(2)
  })
})
