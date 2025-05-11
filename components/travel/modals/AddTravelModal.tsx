import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Travel } from "@/types/travel";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (travel: Travel) => void;
  initialData?: Travel | null;
};

export default function AddTravelModal({
  open,
  onClose,
  onAdd,
  initialData,
}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    coverImage: "",
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [dateError, setDateError] = useState("");

  // initialData가 변경될 때마다 폼 데이터 업데이트
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        location: initialData.location,
        coverImage: initialData.coverImage || "",
      });
    } else if (!open) {
      // 모달이 닫힐 때 초기화
      setFormData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        coverImage: "",
      });
      setCoverFile(null);
      setDateError("");
    }
  }, [open, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 날짜 유효성 검사
    if (name === "startDate" || name === "endDate") {
      const start = name === "startDate" ? value : formData.startDate;
      const end = name === "endDate" ? value : formData.endDate;

      if (start && end && new Date(start) > new Date(end)) {
        setDateError("종료일은 시작일보다 이후여야 합니다.");
      } else {
        setDateError("");
      }
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCoverFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData((prev) => ({
          ...prev,
          coverImage: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, coverImage: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 날짜 유효성 검사
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setDateError("종료일은 시작일보다 이후여야 합니다.");
      return;
    }

    onAdd({
      id: initialData?.id || Math.random().toString(36).slice(2),
      ...formData,
    });
    handleClose();
  };

  const handleClose = () => {
    setCoverFile(null);
    setFormData((prev) => ({ ...prev, coverImage: "" }));
    setDateError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl p-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              {initialData ? "여행 정보 수정" : "새 여행 추가"}
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              name="title"
              placeholder="제목"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded text-dark"
              required
            />
            <textarea
              name="description"
              placeholder="설명"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded text-dark"
              rows={3}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="장소"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded text-dark"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-dark"
                  required
                />
              </div>
              <div>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-dark"
                  required
                />
                {dateError && (
                  <p className="text-red-500 text-sm mt-1">{dateError}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-700"
              >
                커버 이미지 첨부
              </label>
              <input
                type="file"
                id="coverImage"
                accept=".jpg,.jpeg,.png"
                onChange={handleCoverImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="커버 미리보기"
                  className="mt-2 rounded w-full h-40 object-cover"
                />
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded border text-dark"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-button hover:bg-button-hover dark:bg-button-dark dark:hover:bg-button-darkHover text-white"
                disabled={!!dateError}
              >
                {initialData ? "수정하기" : "추가하기"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
