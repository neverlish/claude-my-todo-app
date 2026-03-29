# 나의 할 일

Next.js 14 + TypeScript + Tailwind CSS + PocketBase 기반 Todo 앱

## 시작하기

1. 의존성 설치
   ```bash
   npm install
   ```

2. 환경변수 설정
   ```bash
   cp .env.local.example .env.local
   ```
   `.env.local`을 열어 `NEXT_PUBLIC_POCKETBASE_URL`을 PocketBase 서버 주소로 설정하세요.

3. 개발 서버 실행
   ```bash
   npm run dev
   ```
   브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 배포 (Vercel)

1. [Vercel](https://vercel.com)에서 이 저장소를 import 하세요.
2. 프로젝트 설정 > Environment Variables에서 `NEXT_PUBLIC_POCKETBASE_URL`을 추가하세요.
3. Deploy 버튼을 클릭하세요.

## 기술 스택

- [Next.js 14](https://nextjs.org) — App Router
- TypeScript
- Tailwind CSS
- [PocketBase](https://pocketbase.io) — 백엔드 데이터베이스
