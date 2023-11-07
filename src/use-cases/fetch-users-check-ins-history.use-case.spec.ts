import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { FetchUsersCheckInsHistoryUseCase } from "./fetch-users-check-ins-history.use-case"

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUsersCheckInsHistoryUseCase

describe("Fetch Check-in History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUsersCheckInsHistoryUseCase(checkInsRepository)
  })

  it("should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      gymId: "gym-01",
      userId: "user-01",
    })

    await checkInsRepository.create({
      gymId: "gym-02",
      userId: "user-01",
    })

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-01" }),
      expect.objectContaining({ gymId: "gym-02" }),
    ])
  })

  it("should be able to fetch paginated check-in history", async () => {
    for (let index = 1; index <= 22; index++) {
      await checkInsRepository.create({
        gymId: `gym-${index}`,
        userId: "user-01",
      })
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-21" }),
      expect.objectContaining({ gymId: "gym-22" }),
    ])
  })
})
