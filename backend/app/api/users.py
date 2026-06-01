from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.database import get_db
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.dependencies import require_admin

router = APIRouter(
    prefix="/api/v1/users",
    tags=["Users"]
)

@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }

@router.get("/")
def get_all_users(
    db: Session = Depends(get_db),
    admin = Depends(require_admin)
):

    return db.query(User).all()