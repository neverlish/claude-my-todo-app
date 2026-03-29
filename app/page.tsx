'use client';

import { useState, useEffect } from 'react';
import type { Todo } from '@/types/todo';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import pb from '@/lib/pocketbase';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    pb.collection('todos')
      .getFullList<Todo>({ sort: '-created_at', perPage: 500, requestKey: null })
      .then(setTodos)
      .catch(console.error);
  }, []);

  const handleAdd = async (title: string) => {
    const created = await pb.collection('todos').create<Todo>({ title, is_completed: false });
    setTodos((prev) => [created, ...prev]);
  };

  const handleToggle = async (id: string) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    const updated = await pb
      .collection('todos')
      .update<Todo>(id, { is_completed: !target.is_completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await pb.collection('todos').delete(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-100 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-black text-slate-900 mb-2 tracking-tight">나의 할 일</h1>
        <p className="text-slate-400 text-lg mb-10">오늘 할 일을 추가해보세요.</p>
        <AddTodoForm onAdd={handleAdd} />
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </main>
  );
}
