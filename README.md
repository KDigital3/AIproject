# 무디트리 (MoodiTree)

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-state-443E38?style=flat-square)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)

사용자가 입력한 문장을 분석해 감정을 진단하고, 감정에 맞는 음악과 영화를 추천하는 웹 서비스입니다. K-Digital Training 팀 프로젝트로 시작했습니다(2025.06 ~ 2025.07, 프론트엔드 2명·백엔드 2명).

## 목차

1. [주요 기능](#주요-기능)
2. [기술 스택](#기술-스택)
3. [로컬 개발](#로컬-개발)
4. [환경 변수](#환경-변수)
5. [배포](#배포)
6. [프로젝트 구조](#프로젝트-구조)
7. [라우트](#라우트)
8. [API](#api)
9. [팀](#팀)

## 주요 기능

| 기능 | 설명 |
| --- | --- |
| 감정 진단 | 사용자가 입력한 문장을 외부 감정 분석 API로 전송해 감정(긍정적/보통/부정적 등)을 진단 |
| 콘텐츠 추천 | 진단된 감정에 따라 정적 데이터에서 음악·영화 3건을 랜덤 추천 |
| 감정 기록 | 추천 내역을 MongoDB에 저장해 마이페이지에서 이력 확인 |
| 감정 일기 | Zustand + localStorage 기반 캘린더에 오늘의 감정과 메모를 기록 |

## 기술 스택

- **Frontend**: React 19, React Router, Zustand(전역 상태 · 캘린더), GSAP + Lenis(스크롤 애니메이션), react-icons
- **Backend**: Express 5, MongoDB(Mongoose 8) — `mooditree-server/`
- **협업**: GitHub(브랜치 전략), Notion(회의 기록), Figma(UI 프로토타입 공유)

## 로컬 개발

```bash
# 프론트엔드
cp .env.example .env
npm install
npm start

# 백엔드 (mooditree-server/)
cd mooditree-server
cp .env.example .env
# .env 파일에 MONGO_URI 설정 필요
npm install
node server.js
```

## 환경 변수

### Frontend (`.env`)

| 변수 | 기본값 | 설명 |
| --- | --- | --- |
| `REACT_APP_API_URL` | `http://localhost:4000` | 백엔드 API 서버 주소 |

### Backend (`mooditree-server/.env`)

| 변수 | 기본값 | 설명 |
| --- | --- | --- |
| `MONGO_URI` | (필수) | MongoDB Atlas 접속 문자열 |
| `PORT` | `4000` | 서버 포트 |

## 배포

### Backend (Render / Railway / Fly.io)

1. MongoDB Atlas 클러스터 생성 후 `MONGO_URI` 확보
2. `mooditree-server/`를 Node.js 앱으로 배포
3. 환경 변수에 `MONGO_URI` 설정
4. Start command: `node server.js`

### Frontend (Vercel / Netlify)

1. `REACT_APP_API_URL`을 배포된 백엔드 URL로 설정
2. Build command: `npm run build`
3. Publish directory: `build/`

### 단일 서버 배포

React build 파일을 Express가 정적 파일로 서빙하도록 구성할 수 있습니다:

```javascript
app.use(express.static('../build'));
```

## 프로젝트 구조

```
src/
  component/   Header · Footer · Login · Join
  page/        Main · MoodCheck · Music · Movie · Loading · MusicResult
               MovieResult · MoodSurvey · Calendar · Detail · MyPage
               Guide · Contact
  store/       Zustand 전역 상태 (캘린더 emotionMap · noteMap)
  data/        정적 음악/영화 추천 데이터 (50건 × 5감정)
  image/       앨범 커버 · 영화 포스터 · UI 에셋

public/
  assets/      브랜드 에셋 (tree · note · movie · earphones)

mooditree-server/
  server.js    Express 서버 (라우트 통합)
  server/models/  Emotion 스키마 (Mongoose)
```

## 라우트

| 경로 | 페이지 | 설명 |
| --- | --- | --- |
| `/` | Main | 메인 · 감정 진단 입력 |
| `/About` | Guide | 서비스 소개 · FAQ |
| `/MoodCheck` | MoodCheck | 음악/영화/설문 선택 허브 |
| `/Music` | Music | 음악 추천 안내 |
| `/Movie` | Movie | 영화 추천 안내 |
| `/Survey` | MoodSurvey | 8문항 감정 설문 |
| `/Loading/:type/:mood` | Loading | 3초 로딩 후 결과 이동 |
| `/MusicResult/:mood` | MusicResult | 추천 음악 3건 |
| `/MovieResult/:mood` | MovieResult | 추천 영화 3건 |
| `/MyPage` | MyPage | 오늘의 감정 · 추천 이력 · 프로필 |
| `/Calendar` | Calendar | 감정 일기 캘린더 |
| `/Detail/:date` | Detail | 일기 상세 · 삭제 |
| `/Login` | Login | 로그인 |
| `/Join` | Join | 회원가입 |
| `/Contact` | Contact | 문의 (로컬 console.log만) |

## API

| 메서드 | 경로 | 설명 |
| --- | --- | --- |
| POST | `/api/join` | 회원가입 (name · email · password) |
| POST | `/api/login` | 로그인 (email · password) |
| POST | `/api/emotion` | 감정 + 추천 저장 |
| GET | `/api/emotion?email=` | 해당 사용자의 감정 이력 조회 |

외부: `POST https://flask-emotion-api-7u41.onrender.com/api/sentiment` — 문장 감정 분석

## 팀

프론트엔드 2명·백엔드 2명, 총 4명이 참여했습니다. 기여 내역은 각자 GitHub 커밋 히스토리를 참고해주세요.
