import request from "supertest"
import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user"

describe("(e2e) Nearby Gyms", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "any description",
        phone: "11999999999",
        latitude: -3.0733864,
        longitude: -60.0048354,
      })

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript gym",
        description: "any description",
        phone: "11999999999",
        latitude: -2.7334472,
        longitude: -59.8884113,
      })

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -3.0733864,
        longitude: -60.0048354,
      })
      .set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ])
  })
})
