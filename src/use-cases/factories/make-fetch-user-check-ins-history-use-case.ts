import { FetchUsersCheckInsHistoryUseCase } from "../fetch-users-check-ins-history.use-case"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeFetchUsersCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUsersCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
