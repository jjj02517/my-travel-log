import { useState } from "react";
import type { Travel } from "@/types/travel";
import { mockTags } from "@/msw/data/mockData";
import type { TravelListItem } from "@/types/travel";
import Image from "next/image";

type Props = TravelListItem;

export default function TravelCoverCard({
  title,
  coverImage,
  startDate,
  endDate,
  location,
}: Props) {
  const [imgError, setImgError] = useState(false);

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-md transition bg-white">
      {coverImage && !imgError ? (
        <Image
          src={coverImage}
          alt={title}
          className="w-full h-52 object-cover"
          width={208}
          height={117}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-52 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
          이미지가 없습니다
        </div>
      )}
      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">📍 {location}</p>
        <p className="text-sm text-gray-500">
          📅 {formatDate(startDate)} ~ {formatDate(endDate)}
        </p>
      </div>
    </div>
  );
}
