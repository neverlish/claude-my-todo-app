# my-todo-app Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Next.js 14 App Router 기반 Todo 앱 프로젝트 틀 생성 (DB 연동 제외)

**Architecture:** `create-next-app`으로 프로젝트 초기화 후, PocketBase SDK 설치 및 클라이언트 설정, UI 컴포넌트 틀 작성, Vercel 배포 설정 추가.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, pocketbase (npm SDK), Vercel

---

### Task 1: Next.js 프로젝트 초기화

**Files:**
- Create: `my-todo-app/` (프로젝트 루트)

**Step 1: create-next-app 실행**

```bash
cd /Users/jinhohyeon/Desktop/dev/sparta
npx create-next-app@latest my-todo-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --no-turbopack
```

프롬프트 없이 진행되어야 함. `my-todo-app/` 디렉토리 생성 확인.

**Step 2: 프로젝트 진입 및 PocketBase SDK 설치**

```bash
cd my-todo-app
npm install pocketbase
```

Expected: `pocketbase` 패키지가 `package.json` dependencies에 추가됨.

**Step 3: 기본 보일러플레이트 정리**

`app/page.tsx`를 빈 페이지로 교체:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">My Todo App</h1>
    </main>
  );
}
```

`app/globals.css`는 Tailwind 지시어만 남기고 나머지 기본 스타일 제거:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 4: 커밋**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 14 project with TypeScript and Tailwind"
```

---

### Task 2: 타입 정의 및 PocketBase 클라이언트 설정

**Files:**
- Create: `types/todo.ts`
- Create: `lib/pocketbase.ts`
- Create: `.env.local.example`

**Step 1: Todo 타입 정의 작성**

`types/todo.ts`:

```typescript
export type Todo = {
  id: string;
  title: string;
  is_completed: boolean;
  created: string;
  updated: string;
};
```

**Step 2: PocketBase 클라이언트 작성**

`lib/pocketbase.ts`:

```typescript
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL ?? 'http://127.0.0.1:8090');

export default pb;
```

**Step 3: 환경변수 예시 파일 작성**

`.env.local.example`:

```
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

**Step 4: `.env.local`을 `.gitignore`에 추가 확인**

`create-next-app`이 기본으로 추가하지만, `.gitignore`에 `.env.local`이 있는지 확인.

```bash
grep ".env.local" .gitignore
```

없으면 추가:

```
.env.local
```

**Step 5: 커밋**

```bash
git add types/todo.ts lib/pocketbase.ts .env.local.example .gitignore
git commit -m "feat: add Todo type and PocketBase client setup"
```

---

### Task 3: UI 컴포넌트 틀 작성

**Files:**
- Create: `components/AddTodoForm.tsx`
- Create: `components/TodoItem.tsx`
- Create: `components/TodoList.tsx`

**Step 1: AddTodoForm 컴포넌트 작성**

`components/AddTodoForm.tsx`:

```tsx
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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        name="title"
        type="text"
        placeholder="할일을 입력하세요"
        className="flex-1 border rounded px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
      >
        추가
      </button>
    </form>
  );
}
```

**Step 2: TodoItem 컴포넌트 작성**

`components/TodoItem.tsx`:

```tsx
'use client';

import type { Todo } from '@/types/todo';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-2 py-2 border-b last:border-b-0">
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={() => onToggle(todo.id)}
        className="cursor-pointer"
      />
      <span className={`flex-1 text-sm ${todo.is_completed ? 'line-through text-gray-400' : ''}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-400 text-xs hover:text-red-600"
      >
        삭제
      </button>
    </li>
  );
}
```

**Step 3: TodoList 컴포넌트 작성**

`components/TodoList.tsx`:

```tsx
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
    return <p className="text-sm text-gray-400">할일이 없습니다.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
```

**Step 4: 커밋**

```bash
git add components/
git commit -m "feat: add TodoList, TodoItem, AddTodoForm component shells"
```

---

### Task 4: 메인 페이지에 컴포넌트 연결 (로컬 상태 기반 틀)

**Files:**
- Modify: `app/page.tsx`

**Step 1: page.tsx 업데이트**

실제 DB 연동 전, 로컬 상태로 동작하는 틀로 구성:

```tsx
'use client';

import { useState } from 'react';
import type { Todo } from '@/types/todo';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      is_completed: false,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_completed: !t.is_completed } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className="min-h-screen p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Todo App</h1>
      <AddTodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </main>
  );
}
```

**Step 2: 빌드 확인**

```bash
npm run build
```

Expected: 빌드 오류 없음.

**Step 3: 커밋**

```bash
git add app/page.tsx
git commit -m "feat: wire up components with local state on main page"
```

---

### Task 5: Vercel 배포 설정

**Files:**
- Create: `vercel.json`
- Update: `README.md`

**Step 1: vercel.json 작성**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_POCKETBASE_URL": "@pocketbase_url"
  }
}
```

**Step 2: README 작성**

`README.md`:

```markdown
# My Todo App

Next.js 14 + TypeScript + Tailwind CSS + PocketBase

## 시작하기

1. 의존성 설치
   \`\`\`bash
   npm install
   \`\`\`

2. 환경변수 설정
   \`\`\`bash
   cp .env.local.example .env.local
   # .env.local에서 NEXT_PUBLIC_POCKETBASE_URL 설정
   \`\`\`

3. 개발 서버 실행
   \`\`\`bash
   npm run dev
   \`\`\`

## 배포 (Vercel)

Vercel 프로젝트 설정에서 `NEXT_PUBLIC_POCKETBASE_URL` 환경변수를 추가하세요.
```

**Step 3: 최종 커밋**

```bash
git add vercel.json README.md
git commit -m "chore: add Vercel config and README"
```

---

## 완료 기준

- [ ] `npm run dev` 실행 시 localhost:3000에서 앱 동작
- [ ] `npm run build` 빌드 오류 없음
- [ ] 할일 추가/완료 토글/삭제 로컬 상태로 동작
- [ ] PocketBase 클라이언트 파일 존재 (연동은 추후)
- [ ] Vercel 배포 설정 파일 존재
