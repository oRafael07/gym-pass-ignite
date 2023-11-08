import request from "supertest"
import { app } from "@/app"

describe("(e2e) Profile", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    })

    const authResponse = await request(app.server).post("/sessions").send({
      email: "john.doe@example.com",
      password: "123456",
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "john.doe@example.com",
      }),
    )
  })
})
