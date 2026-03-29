'use client';

import type { Todo } from '@/types/todo';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0">
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 cursor-pointer accent-blue-500"
      />
      <span
        className={`flex-1 text-sm ${
          todo.is_completed ? 'line-through text-gray-400' : 'text-gray-700'
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-sm text-red-400 hover:text-red-600 transition-colors px-2"
      >
        삭제
      </button>
    </li>
  );
}
