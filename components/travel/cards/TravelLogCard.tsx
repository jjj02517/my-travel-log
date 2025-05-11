import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import type { TravelLog } from "@/types/travel";
import { useState } from "react";

type Props = {
  log: TravelLog;
  onEdit: (log: TravelLog) => void;
  onDelete: (logId: string) => void;
};

export default function TravelLogCard({ log, onEdit, onDelete }: Props) {
  const [imgError, setImgError] = useState(false);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="border p-4 rounded-md bg-white w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <h4 className="">{formatDate(log.date)}</h4>
          {log.location && <span className="text-sm">📍 {log.location}</span>}
        </div>

        <div className="flex">
          <button
            onClick={() => onEdit(log)}
            className="p-1 rounded hover:bg-gray-100"
            title="수정"
          >
            <PencilIcon className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={() => onDelete(log.id)}
            className="p-1 rounded hover:bg-gray-100"
            title="삭제"
          >
            <TrashIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {(log.weather || log.mood) && (
        <div className="flex gap-4 text-sm text-gray-400 mt-2">
          {log.weather && <span>날씨: {log.weather}</span>}
          {log.mood && <span>기분: {log.mood}</span>}
        </div>
      )}
      <p className="mt-2 text-gray-700 whitespace-pre-wrap break-keep">
        {log.content}
      </p>
      {log.images && !imgError && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {log.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`여행 사진 ${index + 1}`}
              className="w-full h-32 object-cover rounded"
              onError={() => setImgError(true)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
