import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'One Gym',
      description: null,
      phone: null,
      latitude: -25.5706334,
      longitude: -49.3185114,
    })

    await gymsRepository.create({
      title: 'Two Gym',
      description: null,
      phone: null,
      latitude: -25.5706334,
      longitude: -49.3185114,
    })

    const { gyms } = await sut.execute({
      query: 'One',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'One Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Big Gym ${i}`,
        description: null,
        phone: null,
        latitude: -25.5706334,
        longitude: -49.3185114,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Big',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Big Gym 21' }),
      expect.objectContaining({ title: 'Big Gym 22' }),
    ])
  })
})
