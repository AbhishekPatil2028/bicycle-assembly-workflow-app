from sqlalchemy import (
    Column,Integer,String,ForeignKey
)

from sqlalchemy.orm import relationship
from app.database import Base

class Part(Base):
    __tablename__ = "bicycle_parts"

    id = Column(Integer,primary_key=True,index=True)

    part_name = Column(String, nullable=False)

    quantity = Column(Integer, default=1)

    stage = Column(String,default="Procurement")

    bicycle_id = Column(
        Integer,
        ForeignKey("bicycles.id")
    )

    bicycle = relationship(
        "Bicycle",
        back_populates="parts"
    )