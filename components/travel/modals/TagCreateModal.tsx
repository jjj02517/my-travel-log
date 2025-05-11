import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { mockTags } from "@/msw/data/mockData";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (tag: { id: string; name: string; color: string }) => void;
};

export default function TagCreateModal({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#22c55e");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mockTags.some((tag) => tag.name === name.trim())) {
      alert("이미 존재하는 태그입니다.");
      return;
    }
    onCreate({
      id: Math.random().toString(36).slice(2),
      name: name.trim(),
      color,
    });
    setName("");
    setColor("#22c55e");
  };

  const handleClose = () => {
    setName("");
    setColor("#22c55e");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded shadow w-80 mt-0">
          <h2 className="text-lg font-bold text-dark">태그 생성</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              className="w-full p-2 border rounded text-dark"
              placeholder="태그 이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-full h-8 mt-2 p-2 border rounded text-dark"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-1 border rounded text-dark"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-button hover:bg-button-hover dark:bg-button-dark dark:hover:bg-button-darkHover text-white rounded"
              >
                생성
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
