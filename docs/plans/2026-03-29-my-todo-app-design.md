# my-todo-app Design

**Date:** 2026-03-29

## Overview

Next.js 14 App Router 기반의 기본 Todo 앱 프로젝트 틀 생성.
이후 기능 추가를 위한 확장 가능한 구조로 구성.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PocketBase
- **Deployment:** Vercel

## Project Structure

```
my-todo-app/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지 (할일 목록)
│   └── globals.css
├── components/
│   ├── TodoList.tsx        # 할일 목록 컴포넌트
│   ├── TodoItem.tsx        # 개별 할일 아이템
│   └── AddTodoForm.tsx     # 할일 추가 폼
├── lib/
│   └── pocketbase.ts       # PocketBase 클라이언트 초기화
├── types/
│   └── todo.ts             # Todo 타입 정의
├── .env.local.example      # 환경변수 예시
├── vercel.json             # Vercel 배포 설정
└── README.md
```

## Data Model (타입만 정의, DB 생성 제외)

```typescript
type Todo = {
  id: string;
  title: string;
  is_completed: boolean;
  created: string;
}
```

## Scope

- 프로젝트 스캐폴딩만 (실제 DB 연결/기능 구현은 이후 요청)
- 할일 추가 / 완료 토글 / 삭제 UI 컴포넌트 틀
- PocketBase 클라이언트 설정 파일
- Vercel 배포 설정

## Out of Scope (이번 작업)

- DB 테이블 생성
- 실제 API 연동
- 사용자 인증
