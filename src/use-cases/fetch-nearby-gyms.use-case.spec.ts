import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms.use-case"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near gym",
      description: null,
      phone: null,
      latitude: -3.0733864,
      longitude: -60.0048354,
    })

    await gymsRepository.create({
      title: "Far gym",
      description: null,
      phone: null,
      latitude: -2.7334472,
      longitude: -59.8884113,
    })

    const { gyms } = await sut.execute({
      userLatitude: -3.0934418,
      userLongitude: -59.9912742,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Near gym" })])
  })
})
