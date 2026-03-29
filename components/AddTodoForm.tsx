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
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <input
        name="title"
        type="text"
        placeholder="할 일을 입력하세요"
        className="flex-1 bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-300"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 active:scale-95 transition-all shrink-0"
      >
        추가
      </button>
    </form>
  );
}
