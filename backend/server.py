import json
import os
import sqlite3
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse


HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
DEFAULT_DB_PATH = Path(__file__).resolve().parent / "alpfa_points.db"
DB_PATH = Path(os.getenv("DB_PATH", str(DEFAULT_DB_PATH)))
ALLOWED_ORIGINS = {
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
    if origin.strip()
}


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS members (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ucid TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                points INTEGER NOT NULL DEFAULT 0,
                events_attended INTEGER NOT NULL DEFAULT 0
            )
            """
        )
        conn.commit()


def normalize_ucid(ucid: str) -> str:
    return ucid.strip().lower()


def normalize_name(name: str) -> str:
    return " ".join(name.strip().split())


def query_leaderboard(limit: int = 10):
    with get_db_connection() as conn:
        rows = conn.execute(
            """
            SELECT ucid, name, points, events_attended
            FROM members
            ORDER BY points DESC, events_attended DESC, name ASC
            LIMIT ?
            """,
            (max(1, min(limit, 100)),),
        ).fetchall()
    return rows


def rank_for_ucid(ucid: str):
    with get_db_connection() as conn:
        rows = conn.execute(
            """
            SELECT ucid
            FROM members
            ORDER BY points DESC, events_attended DESC, name ASC
            """
        ).fetchall()

    for index, row in enumerate(rows):
        if row["ucid"] == ucid:
            return index + 1
    return len(rows)


class AppHandler(BaseHTTPRequestHandler):
    def _allowed_origin(self):
        origin = self.headers.get("Origin", "").strip()
        if not origin:
            return "*"
        if "*" in ALLOWED_ORIGINS or origin in ALLOWED_ORIGINS:
            return origin
        return ""

    def _set_headers(self, status_code=200):
        allowed_origin = self._allowed_origin()
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        if allowed_origin:
            self.send_header("Access-Control-Allow-Origin", allowed_origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def _send_json(self, payload, status_code=200):
        self._set_headers(status_code)
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            self._send_json({"status": "ok"})
            return

        if parsed.path == "/api/leaderboard":
            qs = parse_qs(parsed.query)
            try:
                limit = int(qs.get("limit", [10])[0])
            except ValueError:
                limit = 10

            rows = query_leaderboard(limit)
            payload = [
                {
                    "rank": index + 1,
                    "ucid": row["ucid"],
                    "name": row["name"],
                    "points": row["points"],
                    "eventsAttended": row["events_attended"],
                }
                for index, row in enumerate(rows)
            ]
            self._send_json(payload)
            return

        self._send_json({"detail": "Not found"}, status_code=404)

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/members/verify-register":
            self._send_json({"detail": "Not found"}, status_code=404)
            return

        try:
            content_length = int(self.headers.get("Content-Length", 0))
            raw_body = self.rfile.read(content_length).decode("utf-8")
            body = json.loads(raw_body)
        except (ValueError, json.JSONDecodeError):
            self._send_json({"detail": "Invalid request payload"}, status_code=400)
            return

        ucid = normalize_ucid(body.get("ucid", ""))
        name = normalize_name(body.get("name", ""))

        if not ucid or not name:
            self._send_json({"detail": "UCID and name are required."}, status_code=400)
            return

        with get_db_connection() as conn:
            existing = conn.execute("SELECT * FROM members WHERE ucid = ?", (ucid,)).fetchone()

            if existing:
                if normalize_name(existing["name"]).lower() != name.lower():
                    self._send_json(
                        {"detail": "UCID exists, but the name does not match our records."},
                        status_code=409,
                    )
                    return

                rank = rank_for_ucid(existing["ucid"])
                self._send_json(
                    {
                        "message": f"{existing['name']}, you have earned {existing['points']} points and are currently #{rank}.",
                        "rank": rank,
                        "name": existing["name"],
                        "ucid": existing["ucid"],
                        "points": existing["points"],
                        "eventsAttended": existing["events_attended"],
                    }
                )
                return

            conn.execute(
                "INSERT INTO members (ucid, name, points, events_attended) VALUES (?, ?, 0, 0)",
                (ucid, name),
            )
            conn.commit()

        rank = rank_for_ucid(ucid)
        self._send_json(
            {
                "message": f"{name}, you are now registered. You have earned 0 points and are currently #{rank}.",
                "rank": rank,
                "name": name,
                "ucid": ucid,
                "points": 0,
                "eventsAttended": 0,
            }
        )


def run_server():
    init_db()
    server = ThreadingHTTPServer((HOST, PORT), AppHandler)
    print(f"Backend running on http://{HOST}:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    run_server()