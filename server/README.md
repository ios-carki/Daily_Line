# 오늘 한 줄 — 로컬 API (FastAPI + SQLite)

앱 실습용 백엔드입니다. **완성본이라 고칠 필요는 없고**, 켜 두고 앱에서 axios로 호출하면 됩니다.

## 실행
```sh
cd server
python3 -m venv .venv                 # 처음 한 번
source .venv/bin/activate             # 터미널을 새로 열 때마다
pip install -r requirements.txt       # 처음 한 번
fastapi dev main.py --host 0.0.0.0 --port 8000
```
- `--host 0.0.0.0` 이 있어야 실제 폰 · Android 에뮬레이터에서 접속할 수 있습니다.
- 첫 실행 때 `app.db`(SQLite 파일)가 생기고 데모 계정이 들어갑니다 → **`demo@example.com` / `demo1234`** (일기 9개)
- 데이터를 처음 상태로 되돌리기: 서버 끄고 `rm app.db` 후 다시 실행
- 로딩 화면 확인: `SLOW_MS=1500 fastapi dev main.py --host 0.0.0.0 --port 8000` (모든 응답 1.5초 지연)
- 네트워크 에러 화면 확인: 서버를 끈 상태로 앱에서 요청

## Swagger 문서
브라우저에서 **http://localhost:8000/docs** — 모든 API를 직접 눌러볼 수 있습니다.
로그인 응답의 `token`을 오른쪽 위 **Authorize** 에 붙여 넣으면 인증이 필요한 API도 호출됩니다.

## 규칙 요약
- 요청 · 응답은 JSON, 키는 camelCase (`createdAt`)
- 인증이 필요한 API: 헤더 `Authorization: Bearer <token>`
- 에러는 항상 `{ "detail": "한국어 메시지" }` → 앱에서 `error.response.data.detail` 을 그대로 보여주면 됨
- 서버가 꺼져 있으면 `error.response` 가 **없음** (네트워크 에러)
- 401은 "토큰이 없거나 무효"(로그인 API만 예외: 이메일/비밀번호 틀림) → 앱에서는 로그아웃 처리. 탈퇴 비밀번호가 틀린 경우는 403

| 메서드 | 경로 | 인증 | 바디 | 성공 | 실패 |
|---|---|---|---|---|---|
| POST | `/auth/signup` | | `{ email, password, name }` | 201 `{ token, user }` | 409 이메일 중복 · 422 |
| POST | `/auth/login` | | `{ email, password }` | 200 `{ token, user }` | 401 |
| POST | `/auth/logout` | ✔ | — | 204 (토큰 폐기) | 401 |
| GET | `/users/me` | ✔ | — | 200 `user` | 401 |
| PATCH | `/users/me` | ✔ | `{ name?, bio? }` | 200 `user` | 401 · 422 |
| DELETE | `/users/me` | ✔ | `{ password }` | 204 (일기 · 세션 함께 삭제) | 403 비밀번호 틀림 · 401 |
| GET | `/entries` | ✔ | — | 200 `entry[]` (날짜 내림차순) | 401 |
| POST | `/entries` | ✔ | `{ date, content, mood }` | 201 `entry` | 409 같은 날짜 · 422 |
| PUT | `/entries/{id}` | ✔ | `{ date, content, mood }` | 200 `entry` | 404 · 409 · 422 |
| DELETE | `/entries/{id}` | ✔ | — | 204 | 404 |

```js
user  = { id, email, name, bio, createdAt }
entry = { id, date: 'YYYY-MM-DD', content, mood: 1~5, createdAt, updatedAt }
```

## 스키마
`db.py` 의 `SCHEMA` 참고. Firebase Realtime DB와 달리 컬럼 · 타입 · 제약을 미리 정의했기 때문에,
없는 컬럼이나 `mood: 9`, 같은 날짜 두 번 같은 데이터는 DB / Pydantic 단계에서 거부됩니다.
