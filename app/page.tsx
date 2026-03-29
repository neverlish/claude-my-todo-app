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
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">나의 할 일</h1>
        <AddTodoForm onAdd={handleAdd} />
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </main>
  );
}
