import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findMany(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
