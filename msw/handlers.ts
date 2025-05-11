import { http, HttpResponse } from "msw";
import { mockTravels, mockTravelLogs, mockTags } from "./data/mockData";
import type { Travel } from "@/types/travel";

export const handlers = [
  // 전체 여행 목록
  http.get("/api/travel", () => {
    return HttpResponse.json(mockTravels);
  }),

  // 개별 여행 상세 (여행 로그 포함)
  http.get("/api/travel/:id", ({ params }) => {
    const { id } = params;
    const travel = mockTravels.find((t) => t.id === id);
    const logs = mockTravelLogs.filter((log) => log.travelId === id);

    if (!travel) {
      return new HttpResponse(null, { status: 404, statusText: "Not found" });
    }

    return HttpResponse.json({
      ...travel,
      logs,
    });
  }),

  // 태그 목록
  http.get("/api/tags", () => {
    return HttpResponse.json(mockTags);
  }),

  // 여행 상세 정보 조회
  http.get("/api/travels/:id", ({ params }) => {
    const { id } = params;
    const travel = mockTravels.find((t) => t.id === id);

    if (!travel) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(travel);
  }),

  // 여행 삭제
  http.delete("/api/travel/:id", ({ params }) => {
    const { id } = params;
    const index = mockTravels.findIndex((t) => t.id === id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    // mockTravels에서만 해당 여행 제거
    mockTravels.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
