import { httpClient } from "@/msw/http";
import type { TravelDetail } from "@/types/travel";

export async function fetchTravelDetail(id: string): Promise<TravelDetail> {
  const response = await httpClient.get(`/api/travel/${id}`);
  return response;
}

export async function deleteTravel(id: string): Promise<void> {
  await httpClient.delete(`/api/travel/${id}`);
}
