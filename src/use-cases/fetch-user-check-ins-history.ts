import { CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '@/repositories/check-ins-repository'
interface IFetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface IFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistory {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryUseCaseRequest): Promise<IFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findMany(userId, page)

    return {
      checkIns,
    }
  }
}
