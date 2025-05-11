import { useState } from "react";
import type { TravelDetail, Tag } from "@/types/travel";
import TravelLogCard from "@/components/travel/cards/TravelLogCard";
import TravelLogCreateModal from "@/components/travel/modals/TravelLogCreateModal";
import TravelDetailInfoCard from "@/components/travel/cards/TravelDetailInfoCard";

type Props = {
  travel: Omit<TravelDetail, "logs">;
  logs: TravelDetail["logs"];
  onTravelUpdate?: (updatedTravel: Omit<TravelDetail, "logs">) => void;
  onTravelDelete?: (travelId: string) => void;
};

export default function TravelLogList({
  travel,
  logs,
  onTravelUpdate,
  onTravelDelete,
}: Props) {
  const [tags, setTags] = useState<string[]>(travel.tags.map((tag) => tag.id));
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logList, setLogList] = useState<TravelDetail["logs"]>(logs);
  const [editingLog, setEditingLog] = useState<TravelDetail["logs"][0] | null>(
    null
  );

  // 새 일정 등록
  const handleAddNewLog = () => {
    setEditingLog(null);
    setIsLogModalOpen(true);
  };

  const handleCreateLog = (newLog) => {
    if (editingLog) {
      // 수정 모드
      setLogList((prev) =>
        prev.map((log) => (log.id === editingLog.id ? newLog : log))
      );
    } else {
      // 새로 생성 모드
      setLogList((prev) => [...prev, newLog]);
    }
  };

  // 일정 수정
  const handleEditLog = (log: TravelDetail["logs"][0]) => {
    setEditingLog(log);
    setIsLogModalOpen(true);
  };

  // 일정 삭제
  const handleDeleteLog = (logId: string) => {
    if (window.confirm("정말로 이 일정을 삭제하시겠습니까?")) {
      setLogList((prev) => prev.filter((log) => log.id !== logId));
    }
  };

  // 날짜순으로 정렬된 로그 목록
  const sortedLogs = [...logList].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="space-y-8 flex flex-col items-center">
      {/* 여행 정보 카드 */}
      <TravelDetailInfoCard
        travel={travel}
        tags={tags}
        onTagsChange={setTags}
        onTravelUpdate={onTravelUpdate}
        onTravelDelete={onTravelDelete}
      />

      {/* 여행 로그 목록 */}
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">여행 일지</h3>
          <button
            onClick={handleAddNewLog}
            className="bg-button hover:bg-button-hover dark:bg-button-dark dark:hover:bg-button-darkHover text-white px-4 py-2 rounded-md text-sm"
          >
            + 새 일정 등록
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {sortedLogs.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              ✏️ 새로운 일정을 등록해주세요.
            </p>
          ) : (
            sortedLogs.map((log) => (
              <TravelLogCard
                key={log.id}
                log={log}
                onEdit={handleEditLog}
                onDelete={handleDeleteLog}
              />
            ))
          )}
        </div>
      </div>

      <TravelLogCreateModal
        open={isLogModalOpen}
        onClose={() => {
          setIsLogModalOpen(false);
          setEditingLog(null);
        }}
        onCreate={handleCreateLog}
        travelId={travel.id}
        initialData={editingLog}
      />
    </div>
  );
}
