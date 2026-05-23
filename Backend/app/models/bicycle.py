from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base

class Bicycle(Base):
    __tablename__ = "bicycles"
    

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    parts = relationship(
        "Part",
        back_populates="bicycle",
        cascade="all, delete"
    )
    