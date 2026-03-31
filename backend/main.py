from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session, declarative_base, Mapped, mapped_column, sessionmaker
from sqlalchemy import Integer, String
from pydantic import BaseModel


DATABASE_URL = "sqlite:///./alpfa_points.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


class Member(Base):
    __tablename__ = "members"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    ucid: Mapped[str] = mapped_column(String(30), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    points: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    events_attended: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class MemberInput(BaseModel):
    ucid: str
    name: str


class MemberResponse(BaseModel):
    message: str
    rank: int
    name: str
    ucid: str
    points: int
    eventsAttended: int


class LeaderboardItem(BaseModel):
    rank: int
    name: str
    ucid: str
    points: int
    eventsAttended: int


app = FastAPI(title="ALPFA NJIT Points API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def normalize_ucid(ucid: str) -> str:
    return ucid.strip().lower()


def normalize_name(name: str) -> str:
    return " ".join(name.strip().split())


def sorted_members(session: Session):
    return session.scalars(
        select(Member).order_by(Member.points.desc(), Member.events_attended.desc(), Member.name.asc())
    ).all()


def get_rank(ordered_members: list[Member], ucid: str) -> int:
    for index, member in enumerate(ordered_members):
        if member.ucid == ucid:
            return index + 1
    return len(ordered_members)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/leaderboard", response_model=list[LeaderboardItem])
def get_leaderboard(limit: int = 10):
    with SessionLocal() as session:
        ordered = sorted_members(session)[: max(1, min(limit, 100))]
        return [
            LeaderboardItem(
                rank=index + 1,
                name=member.name,
                ucid=member.ucid,
                points=member.points,
                eventsAttended=member.events_attended,
            )
            for index, member in enumerate(ordered)
        ]


@app.post("/api/members/verify-register", response_model=MemberResponse)
def verify_or_register_member(payload: MemberInput):
    ucid = normalize_ucid(payload.ucid)
    name = normalize_name(payload.name)

    if not ucid or not name:
        raise HTTPException(status_code=400, detail="UCID and name are required.")

    with SessionLocal() as session:
        existing = session.scalar(select(Member).where(Member.ucid == ucid))

        if existing:
            if normalize_name(existing.name).lower() != name.lower():
                raise HTTPException(status_code=409, detail="UCID exists, but the name does not match our records.")

            ordered = sorted_members(session)
            rank = get_rank(ordered, existing.ucid)
            return MemberResponse(
                message=f"{existing.name}, you have earned {existing.points} points and are currently #{rank}.",
                rank=rank,
                name=existing.name,
                ucid=existing.ucid,
                points=existing.points,
                eventsAttended=existing.events_attended,
            )

        new_member = Member(ucid=ucid, name=name, points=0, events_attended=0)
        session.add(new_member)
        session.commit()
        session.refresh(new_member)

        ordered = sorted_members(session)
        rank = get_rank(ordered, new_member.ucid)
        return MemberResponse(
            message=f"{new_member.name}, you are now registered. You have earned 0 points and are currently #{rank}.",
            rank=rank,
            name=new_member.name,
            ucid=new_member.ucid,
            points=new_member.points,
            eventsAttended=new_member.events_attended,
        )