import type { Card } from './Card'
import type { User } from './User'

export interface Trade {
  id: string
  userId: string
  createdAt: string
  user: User
  tradeCards: TradeCard[]
}

export interface TradeCard {
  id: string
  cardId: string
  tradeId: string
  type: 'OFFERING' | 'RECEIVING'
  card: Card
}
