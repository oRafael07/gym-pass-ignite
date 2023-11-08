import request from "supertest"
import { app } from "@/app"

describe("(e2e) Authenticate", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    })

    const response = await request(app.server).post("/sessions").send({
      email: "john.doe@example.com",
      password: "123456",
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
