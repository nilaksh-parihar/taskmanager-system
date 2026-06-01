from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from app.core.dependencies import get_current_user

from app.schemas.task import (
    TaskCreate,
    TaskUpdate
)

router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["Tasks"]
)

@router.post("/")
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    new_task = Task(
        title=task.title,
        description=task.description,
        user_id=current_user.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@router.get("/{task_id}")
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    if (
        task.user_id != current_user.id
        and current_user.role != "ADMIN"
    ):
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return task

@router.get("/")
def get_tasks(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    tasks = (
        db.query(Task)
        .filter(Task.user_id == current_user.id)
        .all()
    )

    return tasks

@router.put("/{task_id}")
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    if (
        task.user_id != current_user.id
        and current_user.role != "ADMIN"
    ):
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    task.title = task_data.title
    task.description = task_data.description
    task.status = task_data.status

    db.commit()
    db.refresh(task)

    return task

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    if (
        task.user_id != current_user.id
        and current_user.role != "ADMIN"
    ):
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted successfully"
    }