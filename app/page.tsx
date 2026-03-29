'use client';

import { useState, useEffect } from 'react';
import type { Todo } from '@/types/todo';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import supabase from '@/lib/supabase';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setTodos(data ?? []);
      });
  }, []);

  const handleAdd = async (title: string) => {
    const { data, error } = await supabase
      .from('todos')
      .insert({ title, is_completed: false })
      .select()
      .single();
    if (error) { console.error(error); return; }
    setTodos((prev) => [data, ...prev]);
  };

  const handleToggle = async (id: string) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    const { data, error } = await supabase
      .from('todos')
      .update({ is_completed: !target.is_completed })
      .eq('id', id)
      .select()
      .single();
    if (error) { console.error(error); return; }
    setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) { console.error(error); return; }
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
