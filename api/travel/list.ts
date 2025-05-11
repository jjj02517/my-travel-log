import type { TravelListItem } from '@/types/travel'

export async function fetchTravelList(): Promise<TravelListItem[]> {
  console.log('fetchTravelList')
  const res = await fetch('/api/travel')
  if (!res.ok) throw new Error('여행 목록을 불러오지 못했습니다.')
  return res.json()
} 