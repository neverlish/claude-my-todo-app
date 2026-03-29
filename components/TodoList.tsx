'use client';

import type { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-8">
        할 일이 없습니다. 새로운 할 일을 추가해보세요!
      </p>
    );
  }

  return (
    <ul className="bg-white rounded-lg border border-gray-200">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
