import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/gyms-repository'

interface ISearchGymUseCaseRequest {
  query: string
  page: number
}

interface ICreateGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymUseCaseRequest): Promise<ICreateGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
