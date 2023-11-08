import request from "supertest"
import { app } from "@/app"

describe("(e2e) Register Controller", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    })
    expect(response.statusCode).toBe(201)
  })
})
