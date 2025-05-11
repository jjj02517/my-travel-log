import { Tag, Travel, TravelLog } from "@/types/travel";

export const mockTags: Tag[] = [
  { id: "1", name: "힐링", color: "#22c55e" },
  { id: "2", name: "맛집", color: "#ef4444" },
  { id: "3", name: "자연", color: "#3b82f6" },
  { id: "4", name: "쇼핑", color: "#f59e0b" },
  { id: "5", name: "테마파크", color: "#8b5cf6" },
];

// 여행-태그 연결 정보를 저장하는 Map
export const travelTagMap = new Map<string, Set<string>>();

export const mockTravels: Travel[] = [
  {
    id: "1",
    title: "도쿄 여행",
    description: "이번 도쿄여행의 테마는 디즈니랜드 방문~",
    startDate: new Date("2024-03-10"),
    endDate: new Date("2024-03-15"),
    location: "도쿄",
    coverImage: "/images/tokyo-cover.jpg",
    createdAt: new Date("2024-03-10T00:00:00Z"),
    updatedAt: new Date("2024-03-10T00:00:00Z"),
    tags: [
      mockTags[1], // 맛집
      mockTags[3], // 쇼핑
      mockTags[4], // 테마파크
    ],
  },
  {
    id: "2",
    title: "제주도 여행",
    description: "가까워서 오히려 더 자주 못가는 제주도",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-05"),
    location: "제주도",
    coverImage: "/images/jeju-cover.jpg",
    createdAt: new Date("2024-05-01T00:00:00Z"),
    updatedAt: new Date("2024-05-01T00:00:00Z"),
    tags: [
      mockTags[0], // 힐링
      mockTags[1], // 맛집
      mockTags[2], // 자연
    ],
  },
  {
    id: "3",
    title: "오사카 여행",
    description: "벌써 오사카만 3번째 여행이라니~",
    startDate: new Date("2024-07-20"),
    endDate: new Date("2024-07-24"),
    location: "오사카",
    coverImage: "",
    createdAt: new Date("2024-07-20T00:00:00Z"),
    updatedAt: new Date("2024-07-20T00:00:00Z"),
    tags: [
      mockTags[1], // 맛집
      mockTags[2], // 자연
      mockTags[4], // 테마파크
    ],
  },
];

// 새로운 여행 데이터를 Mock 데이터에 추가하는 함수
export function addMockTravel(travel: Omit<Travel, "id">) {
  const lastId =
    mockTravels.length > 0
      ? parseInt(mockTravels[mockTravels.length - 1].id)
      : 0;
  const newId = (lastId + 1).toString();

  const newTravel: Travel = {
    ...travel,
    id: newId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mockTravels.push(newTravel);
  return newTravel;
}

export const mockTravelLogs: TravelLog[] = [
  {
    id: "1",
    travelId: "1",
    date: "2024-03-10",
    content: "도쿄 도착! 기다리던 도쿄 여행 시작~ 설레는 마음이 한가득.",
    images: ["/images/tokyo-station.jpg"],
    location: "도쿄역",
    weather: "맑음",
    mood: "설렘",
  },
  {
    id: "2",
    travelId: "1",
    date: "2024-03-15",
    content:
      "도쿄여행에서는 신나는 디즈니 랜드 첫 방문! 디즈니 캐릭터들과 함께 즐거운 시간을 보냈다. 너무 즐겁쟈냐",
    images: ["/images/tokyo-disney.png", "/images/tokyo-disney2.png"],
    location: "도쿄 디즈니랜드",
    weather: "맑음",
    mood: "행복",
  },
  {
    id: "3",
    travelId: "2",
    date: "2024-05-01",
    content: "제주도 도착! 제주도는 언제나 설레고 즐거워",
    images: ["/images/jeju-airport.jpeg"],
    location: "제주국제공항",
    weather: "맑음",
    mood: "행복",
  },
  {
    id: "4",
    travelId: "2",
    date: "2024-05-02",
    content: "수학여행 이후 오는 성산일출봉은 느낌이 달랐다 멋져",
    images: ["/images/jeju-sungsan.jpg"],
    location: "성산일출봉",
    weather: "맑음",
    mood: "평온",
  },
  {
    id: "5",
    travelId: "3",
    date: "2024-07-20",
    content:
      "오사카 도착! 도착하자마자 숙소가 있는 도톤보리로 왔는데 여긴 언제나 북적거린다..! 그리고 여기서 먹는 다코야키는 왜 맛있지? ㅎㅎ",
    images: ["/images/osaka-dotonbori.jpg", "/images/osaka-takoyaki.jpg"],
    location: "도톤보리",
    weather: "맑음",
    mood: "설렘",
  },
  {
    id: "6",
    travelId: "3",
    date: "2024-07-21",
    content: "유니버설 스튜디오에서 시간 가는줄모르고 구경했다 .. ",
    images: ["/images/osaka-usj.jpg"],
    location: "유니버설 스튜디오 재팬",
    weather: "맑음",
    mood: "행복",
  },
];

// Initialize travel-tag relationships
mockTravels.forEach((travel) => {
  const tagSet = new Set<string>();
  switch (travel.id) {
    case "1": // 도쿄
      tagSet.add("2"); // 맛집
      tagSet.add("4"); // 쇼핑
      tagSet.add("5"); // 테마파크
      break;
    case "2": // 제주도
      tagSet.add("1"); // 힐링
      tagSet.add("2"); // 맛집
      tagSet.add("3"); // 자연
      break;
    case "3": // 오사카
      tagSet.add("2"); // 맛집
      tagSet.add("3"); // 자연
      tagSet.add("5"); // 테마파크
      break;
  }
  travelTagMap.set(travel.id, tagSet);
});
