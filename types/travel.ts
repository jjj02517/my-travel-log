export type Tag = {
  id: string
  name: string
  color: string
}

export type Travel = {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  location: string
  coverImage: string
  tags: Tag[]
  createdAt: Date
  updatedAt: Date
}

export type TravelLog = {
  id: string
  travelId: string
  date: Date
  content: string
  images: string[]
  location: string
  weather: string
  mood: string
}

// For backward compatibility
export type TravelListItem = Pick<Travel, 'id' | 'title' | 'coverImage' | 'startDate' | 'endDate'>

// Travel detail with logs
export type TravelDetail = Travel & {
  logs: TravelLog[]
}
