"""오늘 한 줄 (Daily Line) — 로컬 실습용 API.

실행:  fastapi dev main.py --host 0.0.0.0 --port 8000
문서:  http://localhost:8000/docs  (Swagger — 여기서 바로 요청을 보내볼 수 있음)
"""

import asyncio
import os
import re
import secrets
import sqlite3
from contextlib import asynccontextmanager
from datetime import date

from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, field_validator

import db

SLOW_MS = int(os.getenv("SLOW_MS", "0"))  # 로딩 화면 확인용 응답 지연 (예: SLOW_MS=1500)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init_db()
    yield


app = FastAPI(title="오늘 한 줄 API", version="1.0.0", lifespan=lifespan)


@app.middleware("http")
async def slow_down(request: Request, call_next):
    if SLOW_MS and request.url.path not in ("/docs", "/openapi.json", "/health"):
        await asyncio.sleep(SLOW_MS / 1000)
    return await call_next(request)


# ------------------------------------------------------------------
# 에러 형식 통일: 모든 에러는 { "detail": "한국어 메시지" }
# ------------------------------------------------------------------
@app.exception_handler(RequestValidationError)
async def validation_error(request: Request, exc: RequestValidationError):
    err = exc.errors()[0]
    msg = err.get("msg", "")
    if msg.startswith("Value error, "):
        msg = msg[len("Value error, "):]
    elif err.get("type") == "missing":
        msg = f"'{err['loc'][-1]}' 값이 필요해요."
    elif err.get("type") == "json_invalid":
        msg = "요청 본문이 올바른 JSON이 아니에요."
    else:
        msg = f"'{err['loc'][-1]}' 값이 올바르지 않아요."
    return JSONResponse(status_code=422, content={"detail": msg})


# ------------------------------------------------------------------
# 요청 바디 (Pydantic이 타입 · 규칙 검증 → 실패하면 422)
# ------------------------------------------------------------------
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def check_name(v: str) -> str:
    v = v.strip()
    if not 1 <= len(v) <= 20:
        raise ValueError("이름은 1~20자로 입력해주세요.")
    return v


def check_bio(v: str) -> str:
    v = v.strip()
    if len(v) > 60:
        raise ValueError("소개는 60자 이하로 입력해주세요.")
    return v


class SignupBody(BaseModel):
    email: str
    password: str
    name: str

    @field_validator("email")
    @classmethod
    def _email(cls, v: str) -> str:
        v = v.strip().lower()
        if not EMAIL_RE.match(v):
            raise ValueError("이메일 형식이 올바르지 않아요.")
        return v

    @field_validator("password")
    @classmethod
    def _password(cls, v: str) -> str:
        if not 8 <= len(v) <= 32:
            raise ValueError("비밀번호는 8~32자로 입력해주세요.")
        return v

    @field_validator("name")
    @classmethod
    def _name(cls, v: str) -> str:
        return check_name(v)


class LoginBody(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def _email(cls, v: str) -> str:
        return v.strip().lower()


class ProfileBody(BaseModel):
    name: str | None = None
    bio: str | None = None

    @field_validator("name")
    @classmethod
    def _name(cls, v):
        return None if v is None else check_name(v)

    @field_validator("bio")
    @classmethod
    def _bio(cls, v):
        return None if v is None else check_bio(v)


class WithdrawBody(BaseModel):
    password: str


class EntryBody(BaseModel):
    date: str
    content: str
    mood: int

    @field_validator("date")
    @classmethod
    def _date(cls, v: str) -> str:
        try:
            d = date.fromisoformat(v)
        except ValueError:
            raise ValueError("날짜는 YYYY-MM-DD 형식이어야 해요.")
        if len(v) != 10:
            raise ValueError("날짜는 YYYY-MM-DD 형식이어야 해요.")
        if d > date.today():
            raise ValueError("미래 날짜에는 쓸 수 없어요.")
        return v

    @field_validator("content")
    @classmethod
    def _content(cls, v: str) -> str:
        v = v.strip()
        if not 1 <= len(v) <= 100:
            raise ValueError("내용은 1~100자로 입력해주세요.")
        return v

    @field_validator("mood")
    @classmethod
    def _mood(cls, v: int) -> int:
        if not 1 <= v <= 5:
            raise ValueError("기분은 1~5 중에서 골라주세요.")
        return v


# ------------------------------------------------------------------
# 응답 변환 (DB 컬럼 snake_case → JSON camelCase)
# ------------------------------------------------------------------
def user_json(row: sqlite3.Row) -> dict:
    return {"id": row["id"], "email": row["email"], "name": row["name"], "bio": row["bio"], "createdAt": row["created_at"]}


def entry_json(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"], "date": row["date"], "content": row["content"], "mood": row["mood"],
        "createdAt": row["created_at"], "updatedAt": row["updated_at"],
    }


def new_session(conn: sqlite3.Connection, user_id: int) -> str:
    token = secrets.token_urlsafe(32)
    conn.execute("INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)", (token, user_id, db.now_iso()))
    return token


# ------------------------------------------------------------------
# 인증: Authorization: Bearer <token>
# ------------------------------------------------------------------
bearer = HTTPBearer(auto_error=False)


def current_user(cred: HTTPAuthorizationCredentials | None = Depends(bearer)) -> sqlite3.Row:
    if cred is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "로그인이 필요해요.")
    with db.connect() as conn:
        row = conn.execute(
            "SELECT users.* FROM sessions JOIN users ON users.id = sessions.user_id WHERE sessions.token = ?",
            (cred.credentials,),
        ).fetchone()
    if row is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "로그인이 만료되었어요. 다시 로그인해주세요.")
    return row


def current_token(cred: HTTPAuthorizationCredentials | None = Depends(bearer)) -> str:
    return cred.credentials if cred else ""


# ------------------------------------------------------------------
# 라우트
# ------------------------------------------------------------------
@app.get("/health", tags=["etc"])
def health():
    return {"ok": True}


@app.post("/auth/signup", status_code=201, tags=["auth"])
def signup(body: SignupBody):
    with db.connect() as conn:
        try:
            cur = conn.execute(
                "INSERT INTO users (email, password_hash, name, created_at) VALUES (?, ?, ?, ?)",
                (body.email, db.hash_password(body.password), body.name, db.now_iso()),
            )
        except sqlite3.IntegrityError:
            raise HTTPException(status.HTTP_409_CONFLICT, "이미 가입된 이메일이에요.")
        token = new_session(conn, cur.lastrowid)
        user = conn.execute("SELECT * FROM users WHERE id = ?", (cur.lastrowid,)).fetchone()
    return {"token": token, "user": user_json(user)}


@app.post("/auth/login", tags=["auth"])
def login(body: LoginBody):
    with db.connect() as conn:
        user = conn.execute("SELECT * FROM users WHERE email = ?", (body.email,)).fetchone()
        if user is None or not db.verify_password(body.password, user["password_hash"]):
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, "이메일 또는 비밀번호가 맞지 않아요.")
        token = new_session(conn, user["id"])
    return {"token": token, "user": user_json(user)}


@app.post("/auth/logout", status_code=204, tags=["auth"])
def logout(user=Depends(current_user), token: str = Depends(current_token)):
    with db.connect() as conn:
        conn.execute("DELETE FROM sessions WHERE token = ?", (token,))


@app.get("/users/me", tags=["users"])
def get_me(user=Depends(current_user)):
    return user_json(user)


@app.patch("/users/me", tags=["users"])
def update_me(body: ProfileBody, user=Depends(current_user)):
    with db.connect() as conn:
        if body.name is not None:
            conn.execute("UPDATE users SET name = ? WHERE id = ?", (body.name, user["id"]))
        if body.bio is not None:
            conn.execute("UPDATE users SET bio = ? WHERE id = ?", (body.bio, user["id"]))
        row = conn.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
    return user_json(row)


@app.delete("/users/me", status_code=204, tags=["users"])
def withdraw(body: WithdrawBody, user=Depends(current_user)):
    if not db.verify_password(body.password, user["password_hash"]):
        # 401이 아니라 403: 토큰은 정상이고 비밀번호만 틀림 → 앱이 "401 = 로그아웃" 규칙을 그대로 쓸 수 있음
        raise HTTPException(status.HTTP_403_FORBIDDEN, "비밀번호가 맞지 않아요.")
    with db.connect() as conn:
        conn.execute("DELETE FROM users WHERE id = ?", (user["id"],))  # sessions · entries는 CASCADE로 함께 삭제


@app.get("/entries", tags=["entries"])
def list_entries(user=Depends(current_user)):
    with db.connect() as conn:
        rows = conn.execute("SELECT * FROM entries WHERE user_id = ? ORDER BY date DESC", (user["id"],)).fetchall()
    return [entry_json(r) for r in rows]


@app.post("/entries", status_code=201, tags=["entries"])
def create_entry(body: EntryBody, user=Depends(current_user)):
    ts = db.now_iso()
    with db.connect() as conn:
        try:
            cur = conn.execute(
                "INSERT INTO entries (user_id, date, content, mood, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
                (user["id"], body.date, body.content, body.mood, ts, ts),
            )
        except sqlite3.IntegrityError:
            raise HTTPException(status.HTTP_409_CONFLICT, "그 날짜에는 이미 한 줄을 남겼어요.")
        row = conn.execute("SELECT * FROM entries WHERE id = ?", (cur.lastrowid,)).fetchone()
    return entry_json(row)


def own_entry(conn: sqlite3.Connection, entry_id: int, user_id: int) -> sqlite3.Row:
    row = conn.execute("SELECT * FROM entries WHERE id = ? AND user_id = ?", (entry_id, user_id)).fetchone()
    if row is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "일기를 찾을 수 없어요.")
    return row


@app.put("/entries/{entry_id}", tags=["entries"])
def update_entry(entry_id: int, body: EntryBody, user=Depends(current_user)):
    with db.connect() as conn:
        own_entry(conn, entry_id, user["id"])
        try:
            conn.execute(
                "UPDATE entries SET date = ?, content = ?, mood = ?, updated_at = ? WHERE id = ?",
                (body.date, body.content, body.mood, db.now_iso(), entry_id),
            )
        except sqlite3.IntegrityError:
            raise HTTPException(status.HTTP_409_CONFLICT, "그 날짜에는 이미 한 줄을 남겼어요.")
        row = conn.execute("SELECT * FROM entries WHERE id = ?", (entry_id,)).fetchone()
    return entry_json(row)


@app.delete("/entries/{entry_id}", status_code=204, tags=["entries"])
def delete_entry(entry_id: int, user=Depends(current_user)):
    with db.connect() as conn:
        own_entry(conn, entry_id, user["id"])
        conn.execute("DELETE FROM entries WHERE id = ?", (entry_id,))
