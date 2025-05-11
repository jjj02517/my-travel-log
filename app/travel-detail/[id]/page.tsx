// app/travel-detail/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TravelLogList from "@/components/travel/lists/TravelLogList";
import TravelDetailSkeleton from "@/components/skeletons/TravelDetailSkeleton";
import { fetchTravelDetail, deleteTravel } from "@/api/travel/detail";
import type { TravelDetail } from "@/types/travel";

export default function TravelDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: travel,
    isLoading,
    isError,
    error,
  } = useQuery<TravelDetail>({
    queryKey: ["travel", id],
    queryFn: () => fetchTravelDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  // 여행 정보 업데이트 핸들러
  const handleTravelUpdate = (updatedTravel: Omit<TravelDetail, "logs">) => {
    // 현재 캐시된 데이터 가져오기
    const currentData = queryClient.getQueryData<TravelDetail>(["travel", id]);
    if (currentData) {
      // 로그 정보는 유지하면서 여행 정보만 업데이트
      const updatedData = {
        ...currentData,
        ...updatedTravel,
      };
      // 캐시 업데이트
      queryClient.setQueryData(["travel", id], updatedData);
    }
  };

  // 여행 삭제 핸들러
  const handleTravelDelete = async (travelId: string) => {
    try {
      // API를 통해 여행 삭제
      await deleteTravel(travelId);

      // 여행 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["travelList"] });

      // 현재 여행 상세 데이터 캐시 제거
      queryClient.removeQueries({ queryKey: ["travel", id] });

      // 메인 페이지로 리다이렉트
      router.push("/");
    } catch (error) {
      console.error("Failed to delete travel:", error);
      alert("여행 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (isLoading) return <TravelDetailSkeleton />;
  if (isError)
    return (
      <div className="p-6 text-red-600">❌ {(error as Error).message}</div>
    );

  const { logs, ...travelInfo } = travel!;

  return (
    <div className="p-6 min-h-[calc(100vh_-_106px)]">
      <TravelLogList
        travel={travelInfo}
        logs={logs}
        onTravelUpdate={handleTravelUpdate}
        onTravelDelete={handleTravelDelete}
      />
    </div>
  );
}
