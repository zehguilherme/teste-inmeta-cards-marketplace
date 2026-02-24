export interface Trade {
  id: string
  userId: string
  createdAt: string
  user: User
  tradeCards: TradeCard[]
}

export interface User {
  name: string
}

export interface TradeCard {
  id: string
  cardId: string
  tradeId: string
  type: 'OFFERING' | 'RECEIVING'
  card: Card
}

export interface Card {
  id: string
  name: string
  description: string
  imageUrl: string
  createdAt: string
}
