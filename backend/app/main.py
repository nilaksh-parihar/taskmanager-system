from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.models.user import User
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.models.task import Task
from app.api.tasks import router as tasks_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(tasks_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Task Manager API Running"
    }