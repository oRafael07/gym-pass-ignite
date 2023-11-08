import request from "supertest"
import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user"

describe("(e2e) Search Gyms", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to search gyms", async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "any description",
        phone: "11999999999",
        latitude: -3.0576514,
        longitude: -59.9681565,
      })

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript gym",
        description: "any description",
        phone: "11999999999",
        latitude: -3.0576514,
        longitude: -59.9681565,
      })

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "JavaScript",
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
