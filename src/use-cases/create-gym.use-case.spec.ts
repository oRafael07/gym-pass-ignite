import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "./create-gym.use-case"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("Register Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -3.0576514,
      longitude: -59.9681565,
    })

    expect(gym).toBeTruthy()
  })
})
