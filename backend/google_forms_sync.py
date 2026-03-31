from dataclasses import dataclass, field
import csv
import hashlib
import os
from typing import Any
import sqlite3
from urllib.error import HTTPError
from urllib.request import urlopen


@dataclass
class SyncConfig:
    spreadsheet_id: str = ""
    worksheet_gid: str = "0"
    worksheet_name: str = "Form Responses 1"
    ucid_field: str = "ucid"
    name_field: str = "name"
    event_field: str = "event"
    points_by_event: dict[str, int] = field(default_factory=dict)


class GoogleFormsSync:
    def __init__(self, db_path: str, config: SyncConfig):
        self.db_path = db_path
        self.config = config

    def _csv_export_url(self) -> str:
        return (
            f"https://docs.google.com/spreadsheets/d/{self.config.spreadsheet_id}/"
            f"export?format=csv&gid={self.config.worksheet_gid}"
        )

    def _normalize_key(self, key: str) -> str:
        return "".join(ch for ch in str(key).strip().lower() if ch.isalnum())

    def _value_from_aliases(self, row: dict[str, Any], aliases: list[str]) -> str:
        if not row:
            return ""

        normalized_row = {self._normalize_key(k): str(v) for k, v in row.items()}
        for alias in aliases:
            value = normalized_row.get(self._normalize_key(alias), "")
            if value.strip():
                return value
        return ""

    def _row_signature(self, row: dict[str, Any]) -> str:
        payload = f"{row['ucid']}|{row['event']}|{row['name']}"
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()

    def _ensure_sync_table(self, conn: sqlite3.Connection) -> None:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS processed_form_rows (
                signature TEXT PRIMARY KEY,
                processed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

    def fetch_rows(self) -> list[dict[str, Any]]:
        if not self.config.spreadsheet_id:
            raise ValueError("Missing spreadsheet_id. Provide it in SyncConfig or GOOGLE_SPREADSHEET_ID.")

        url = self._csv_export_url()
        with urlopen(url) as response:
            body = response.read().decode("utf-8")

        reader = csv.DictReader(body.splitlines())
        return [dict(row) for row in reader]

    def normalize_row(self, row: dict[str, Any]) -> dict[str, Any] | None:
        ucid_raw = self._value_from_aliases(
            row,
            [
                self.config.ucid_field,
                "UCID",
                "NJIT UCID",
                "Student UCID",
            ],
        )
        name_raw = self._value_from_aliases(
            row,
            [
                self.config.name_field,
                "Name",
                "Full Name",
                "Student Name",
            ],
        )
        event_raw = self._value_from_aliases(
            row,
            [
                self.config.event_field,
                "Event",
                "Event Name",
            ],
        )

        ucid = ucid_raw.strip().lower()
        name = " ".join(name_raw.strip().split())
        event_name = event_raw.strip()
        if not ucid or not name or not event_name:
            return None

        points = self.config.points_by_event.get(event_name, 0)
        return {"ucid": ucid, "name": name, "event": event_name, "points": points}

    def apply_rows_to_database(self, rows: list[dict[str, Any]]) -> dict[str, int]:
        inserted_or_updated = 0
        skipped = 0
        duplicates = 0

        with sqlite3.connect(self.db_path) as conn:
            self._ensure_sync_table(conn)

            for raw_row in rows:
                row = self.normalize_row(raw_row)
                if not row:
                    skipped += 1
                    continue

                signature = self._row_signature(row)
                seen = conn.execute(
                    "SELECT 1 FROM processed_form_rows WHERE signature = ?",
                    (signature,),
                ).fetchone()
                if seen:
                    duplicates += 1
                    continue

                existing = conn.execute("SELECT id FROM members WHERE ucid = ?", (row["ucid"],)).fetchone()
                if existing:
                    conn.execute(
                        """
                        UPDATE members
                        SET name = ?,
                            points = points + ?,
                            events_attended = events_attended + 1
                        WHERE ucid = ?
                        """,
                        (row["name"], row["points"], row["ucid"]),
                    )
                else:
                    conn.execute(
                        """
                        INSERT INTO members (ucid, name, points, events_attended)
                        VALUES (?, ?, ?, 1)
                        """,
                        (row["ucid"], row["name"], row["points"]),
                    )

                conn.execute(
                    "INSERT INTO processed_form_rows (signature) VALUES (?)",
                    (signature,),
                )
                inserted_or_updated += 1

            conn.commit()

        return {"processed": inserted_or_updated, "skipped": skipped, "duplicates": duplicates}


if __name__ == "__main__":
    spreadsheet_id = os.getenv("GOOGLE_SPREADSHEET_ID", "").strip()
    worksheet_gid = os.getenv("GOOGLE_WORKSHEET_GID", "0").strip()

    # Customize this map for your real event names and point values.
    default_points = {
        "General Meeting": 5,
        "Workshop": 10,
        "Networking Event": 15,
    }

    config = SyncConfig(
        spreadsheet_id=spreadsheet_id,
        worksheet_gid=worksheet_gid,
        points_by_event=default_points,
    )
    sync = GoogleFormsSync(db_path="alpfa_points.db", config=config)

    try:
        rows = sync.fetch_rows()
        result = sync.apply_rows_to_database(rows)
        print(
            f"Sync complete. Processed: {result['processed']}, "
            f"Skipped: {result['skipped']}, Duplicates: {result['duplicates']}"
        )
    except HTTPError as exc:
        if exc.code in (401, 403):
            print("Sync failed: Google Sheet is not publicly readable.")
            print("Set sharing to 'Anyone with the link can view' or use an authenticated Sheets API flow.")
        else:
            print(f"Sync failed with HTTP error {exc.code}: {exc.reason}")
    except Exception as exc:
        print(f"Sync failed: {exc}")