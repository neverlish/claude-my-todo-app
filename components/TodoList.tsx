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
      <p className="text-center text-slate-300 text-xl py-16">
        할 일이 없습니다.
      </p>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
