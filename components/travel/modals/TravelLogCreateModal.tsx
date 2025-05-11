import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import type { TravelLog } from "@/types/travel";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (log: TravelLog) => void;
  travelId: string;
  initialData?: TravelLog | null;
};

const MAX_IMAGES = 6;

export default function TravelLogCreateModal({
  open,
  onClose,
  onCreate,
  travelId,
  initialData,
}: Props) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [mood, setMood] = useState("");
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [imageError, setImageError] = useState("");

  // initialData나 open 상태가 변경될 때마다 폼 데이터 업데이트
  useEffect(() => {
    if (open && initialData) {
      // date가 Date면 string으로 변환
      const dateString =
        typeof initialData.date === "string"
          ? initialData.date
          : initialData.date.toISOString().split("T")[0];
      setDate(dateString);
      setContent(initialData.content);
      setLocation(initialData.location);
      setWeather(initialData.weather);
      setMood(initialData.mood);
      setImages(initialData.images || []);
    } else if (!open) {
      // 모달이 닫힐 때 초기화
      setDate(new Date().toISOString().split("T")[0]);
      setContent("");
      setLocation("");
      setWeather("");
      setMood("");
      setImages([]);
      setImageError("");
    }
  }, [open, initialData]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageError("");

    // 현재 이미지 개수와 새로 추가할 이미지 개수의 합이 최대 개수를 초과하는지 확인
    if (images.length + files.length > MAX_IMAGES) {
      setImageError(`이미지는 최대 ${MAX_IMAGES}개까지만 첨부할 수 있습니다.`);
      return;
    }

    const newImages: string[] = [];

    // 각 파일을 순차적으로 처리
    for (const file of files) {
      try {
        const imageUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            resolve(ev.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
        newImages.push(imageUrl);
      } catch (error) {
        console.error("이미지 처리 중 오류 발생:", error);
      }
    }

    // 새로운 이미지들을 기존 이미지 배열에 추가
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      id: initialData?.id || String(Date.now()),
      travelId,
      date: date as unknown as string,
      content: content.trim(),
      images: images,
      location: location.trim(),
      weather: weather.trim(),
      mood: mood.trim(),
    });
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded shadow w-[500px] mt-0">
          <h2 className="text-lg font-bold text-dark">
            {initialData ? "여행 일지 수정" : "새 여행 일지 작성"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                날짜
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded text-dark"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                내용
              </label>
              <textarea
                className="w-full p-2 border rounded text-dark mt-1"
                placeholder="여행 일지 내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                장소
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded text-dark mt-1"
                placeholder="방문한 장소"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                날씨
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded text-dark mt-1"
                placeholder="날씨 상태"
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                기분
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded text-dark mt-1"
                placeholder="오늘의 기분"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between ">
                <label className="block text-sm font-medium text-gray-700">
                  사진 첨부
                </label>
                <span className="text-sm text-gray-500">
                  {images.length}/{MAX_IMAGES}
                </span>
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mt-1"
                disabled={images.length >= MAX_IMAGES}
              />
              {imageError && (
                <p className="mt-1 text-sm text-red-500">{imageError}</p>
              )}
              {images.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image}
                        alt={`여행 사진 ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <TrashIcon className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border rounded text-dark"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-button hover:bg-button-hover dark:bg-button-dark dark:hover:bg-button-darkHover text-white rounded"
              >
                {initialData ? "수정하기" : "작성하기"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
