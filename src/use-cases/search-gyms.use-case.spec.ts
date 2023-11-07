import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { SearchGymsUseCase } from "./search-gyms.use-case"

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascript gym",
      description: null,
      phone: null,
      latitude: -3.0576514,
      longitude: -59.9681565,
    })

    await gymsRepository.create({
      title: "Typescript",
      description: null,
      phone: null,
      latitude: -3.0576514,
      longitude: -59.9681565,
    })

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Javascript gym" })])
  })

  it("should be able to fetch paginated gyms search", async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `Javascript gym ${index}`,
        description: null,
        phone: null,
        latitude: -3.0576514,
        longitude: -59.9681565,
      })
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript gym 21" }),
      expect.objectContaining({ title: "Javascript gym 22" }),
    ])
  })
})
