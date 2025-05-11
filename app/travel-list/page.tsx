"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import TravelCoverCard from "@/components/travel/cards/TravelCoverCard";
import { fetchTravelList } from "@/api/travel/list";
import { fetchTravelDetail } from "@/api/travel/detail";
import type { TravelListItem, TravelDetail } from "@/types/travel";
import { useState } from "react";
import AddTravelModal from "@/components/travel/modals/AddTravelModal";
import { addMockTravel } from "@/msw/data/mockData";

export default function TravelListPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery<TravelListItem[]>({
    queryKey: ["travelList"],
    queryFn: fetchTravelList,
    staleTime: 1000 * 60 * 5, // 5분 캐시 유지
  });

  const handlePrefetch = (id: string): Promise<TravelDetail> => {
    return queryClient.prefetchQuery({
      queryKey: ["travel", id],
      queryFn: () => fetchTravelDetail(id),
      staleTime: 1000 * 60 * 5,
    });
  };

  // 여행 추가 핸들러
  const handleAddTravel = (newTravel: TravelListItem) => {
    // Mock 데이터에 새로운 여행 추가
    const addedTravel = addMockTravel({
      ...newTravel,
      tags: [],
    });

    // 캐시된 여행 목록 업데이트 (맨 뒤에 추가)
    queryClient.setQueryData<TravelListItem[]>(["travelList"], (old = []) => [
      ...old,
      addedTravel,
    ]);
    setIsModalOpen(false);
  };

  if (isLoading) return <div className="p-6">여행 목록 불러오는 중...</div>;
  if (isError) {
    const err = error as Error;
    return <div className="p-6 text-red-600">{err.message}</div>;
  }

  return (
    <div className="p-6 space-y-6 min-h-[calc(100vh_-_106px)]">
      <div className="flex justify-end">
        <button
          className="bg-button hover:bg-button-hover dark:bg-button-dark dark:hover:bg-button-darkHover text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          새 여행 추가
        </button>
      </div>
      <AddTravelModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTravel}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((item) => (
          <Link
            key={item.id}
            href={`/travel-detail/${item.id}`}
            onMouseEnter={() => handlePrefetch(item.id)}
            className="block"
          >
            <TravelCoverCard {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
}
