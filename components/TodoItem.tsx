'use client';

import type { Todo } from '@/types/todo';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={() => onToggle(todo.id)}
        className="w-6 h-6 cursor-pointer accent-indigo-600 shrink-0"
      />
      <span
        className={`flex-1 text-xl font-medium transition-colors ${
          todo.is_completed ? 'line-through text-slate-300' : 'text-slate-800'
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-slate-300 hover:text-red-500 transition-colors text-2xl leading-none shrink-0"
        aria-label="삭제"
      >
        ×
      </button>
    </li>
  );
}
