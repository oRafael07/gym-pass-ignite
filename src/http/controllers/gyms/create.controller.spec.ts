import request from "supertest"
import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user"

describe("(e2e) Create Gym", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript gym",
        description: "any description",
        phone: "11999999999",
        latitude: -3.0576514,
        longitude: -59.9681565,
      })

    expect(response.statusCode).toEqual(201)
  })
})
