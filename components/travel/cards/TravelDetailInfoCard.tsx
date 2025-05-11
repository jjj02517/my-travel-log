import { useState } from "react";
import type { TravelDetail } from "@/types/travel";
import { mockTags } from "@/msw/data/mockData";
import TagCreateModal from "@/components/travel/modals/TagCreateModal";
import AddTravelModal from "@/components/travel/modals/AddTravelModal";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

type Props = {
  travel: Omit<TravelDetail, "logs">;
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
  onTravelUpdate?: (updatedTravel: Omit<TravelDetail, "logs">) => void;
  onTravelDelete?: (travelId: string) => void;
};

export default function TravelDetailInfo({
  travel,
  tags,
  onTagsChange,
  onTravelUpdate,
  onTravelDelete,
}: Props) {
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 사용 가능한 태그 = mockTags에서 이미 추가된 태그 제외
  const availableTags = mockTags.filter((tag) => !tags.includes(tag.id));

  // 태그 추가
  const handleAddTag = (tagId: string) => {
    if (tags.length < 7 && !tags.includes(tagId)) {
      onTagsChange([...tags, tagId]);
    }
  };

  // 태그 삭제
  const handleRemoveTag = (tagId: string) => {
    onTagsChange(tags.filter((id) => id !== tagId));
  };

  // 태그 생성
  const handleCreateTag = (newTag) => {
    mockTags.push(newTag);
    setIsTagModalOpen(false);
  };

  // 여행 정보 수정
  const handleTravelUpdate = (updatedTravel: Omit<TravelDetail, "logs">) => {
    if (onTravelUpdate) {
      onTravelUpdate(updatedTravel);
    }
    setIsEditModalOpen(false);
  };

  // 여행 삭제
  const handleTravelDelete = () => {
    if (window.confirm("정말로 이 여행을 삭제하시겠습니까?")) {
      if (onTravelDelete) {
        onTravelDelete(travel.id);
      }
    }
  };

  return (
    <div className="border p-6 rounded-md bg-white w-full max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dark">{travel.title}</h2>
        <div className="flex">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-1 rounded hover:bg-gray-100"
            title="수정"
          >
            <PencilIcon className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={handleTravelDelete}
            className="p-1 rounded hover:bg-gray-100"
            title="삭제"
          >
            <TrashIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="mt-2 w-full">
        <div className="flex gap-4 text-sm text-gray-500">
          <p>📍 {travel.location}</p>
          <p>
            📅 {travel.startDate} ~ {travel.endDate}
          </p>
        </div>

        <p className="text-gray-700 mt-4 break-keep">{travel.description}</p>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-dark">태그</h3>
            {/* 태그 추가 버튼 */}
            <button
              className="bg-button hover:bg-button-hover dark:bg-button-dark dark:hover:bg-button-darkHover text-white px-4 py-2 rounded-md"
              onClick={() => setIsTagModalOpen(true)}
            >
              +
            </button>
          </div>
          {/* 현재 가지고 있는 태그 뱃지 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tagId) => {
                const tag = mockTags.find((t) => t.id === tagId);
                return (
                  <span
                    key={tagId}
                    className="flex items-center px-3 py-1 rounded-full text-white text-sm"
                    style={{ backgroundColor: tag?.color || "#888" }}
                  >
                    {tag?.name || tagId}
                    <button
                      className="ml-1 text-xs"
                      onClick={() => handleRemoveTag(tagId)}
                      title="삭제"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">사용 가능한 태그</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {availableTags.map((tag) => (
              <button
                key={tag.id}
                className="px-3 py-1 rounded-full text-white text-sm"
                style={{ backgroundColor: tag.color }}
                onClick={() => handleAddTag(tag.id)}
                disabled={tags.length >= 7}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        <TagCreateModal
          open={isTagModalOpen}
          onClose={() => setIsTagModalOpen(false)}
          onCreate={handleCreateTag}
        />
        <AddTravelModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onAdd={handleTravelUpdate}
          initialData={travel}
        />
      </div>
    </div>
  );
}
