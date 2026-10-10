"""SQLite 연결 · 스키마 · 시드 데이터.

Firebase Realtime DB와 달리, 여기서는 테이블과 컬럼을 '미리' 정의합니다.
정의에 없는 컬럼을 넣거나 타입 · 제약(NOT NULL, UNIQUE, CHECK)을 어기면 DB가 거부합니다.
"""

import hashlib
import secrets
import sqlite3
from contextlib import contextmanager
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

DB_PATH = Path(__file__).parent / "app.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    email         TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    name          TEXT    NOT NULL,
    bio           TEXT    NOT NULL DEFAULT '',
    created_at    TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    token      TEXT    PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS entries (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date       TEXT    NOT NULL,                              -- 'YYYY-MM-DD'
    content    TEXT    NOT NULL,
    mood       INTEGER NOT NULL CHECK (mood BETWEEN 1 AND 5),
    created_at TEXT    NOT NULL,
    updated_at TEXT    NOT NULL,
    UNIQUE (user_id, date)                                    -- 하루에 한 줄
);
"""


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.scrypt(password.encode(), salt=bytes.fromhex(salt), n=2**14, r=8, p=1).hex()
    return f"{salt}${digest}"


def verify_password(password: str, stored: str) -> bool:
    salt, digest = stored.split("$")
    check = hashlib.scrypt(password.encode(), salt=bytes.fromhex(salt), n=2**14, r=8, p=1).hex()
    return secrets.compare_digest(check, digest)


@contextmanager
def connect():
    """with db.connect() as conn: — 블록이 끝나면 commit(에러면 rollback) 후 닫음."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")  # ON DELETE CASCADE 동작에 필요
    try:
        with conn:
            yield conn
    finally:
        conn.close()


def init_db() -> None:
    with connect() as conn:
        conn.executescript(SCHEMA)
        if conn.execute("SELECT COUNT(*) FROM users").fetchone()[0] == 0:
            seed(conn)


SEED_ENTRIES = [
    (0, "아침 산책하다가 본 하늘이 유난히 파랬다.", 5),
    (1, "회의가 길어져서 점심을 거의 못 먹었다.", 2),
    (2, "오랜만에 친구랑 통화. 웃다가 배 아픔.", 4),
    (4, "비 와서 집에서 영화 두 편.", 3),
    (6, "axios로 첫 POST 요청 성공!", 5),
    (9, "감기 기운. 일찍 잤다.", 1),
    (13, "새로 산 운동화로 5km 달리기.", 4),
    (20, "카페에서 책 한 권 끝냄.", 4),
    (35, "이사 준비로 하루 종일 짐 싸기.", 2),
]


def seed(conn: sqlite3.Connection) -> None:
    ts = now_iso()
    cur = conn.execute(
        "INSERT INTO users (email, password_hash, name, bio, created_at) VALUES (?, ?, ?, ?, ?)",
        ("demo@example.com", hash_password("demo1234"), "김데모", "하루 한 줄씩 기록 중", ts),
    )
    user_id = cur.lastrowid
    today = date.today()
    conn.executemany(
        "INSERT INTO entries (user_id, date, content, mood, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        [(user_id, (today - timedelta(days=d)).isoformat(), c, m, ts, ts) for d, c, m in SEED_ENTRIES],
    )
