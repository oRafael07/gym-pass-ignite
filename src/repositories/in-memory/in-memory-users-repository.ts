import { Prisma, User } from "@prisma/client"
import { UsersRepository } from "../users-repository"
import { randomUUID } from "node:crypto"

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id)

    if (!user) return null

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) return null

    return user
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
