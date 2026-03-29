'use client';

type Props = {
  onAdd: (title: string) => void;
};

export default function AddTodoForm({ onAdd }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('title') as HTMLInputElement;
    const title = input.value.trim();
    if (!title) return;
    onAdd(title);
    input.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        name="title"
        type="text"
        placeholder="할 일을 입력하세요"
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
      >
        추가
      </button>
    </form>
  );
}
