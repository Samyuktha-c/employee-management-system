from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


@router.get("/", response_model=list[schemas.Employee])
def get_all_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)


@router.get("/{employee_id}", response_model=schemas.Employee)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = crud.get_employee(db, employee_id)

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return employee


@router.post("/", response_model=schemas.Employee)
def create_employee(employee: schemas.EmployeeCreate,
                    db: Session = Depends(get_db)):
    return crud.create_employee(db, employee)


@router.put("/{employee_id}", response_model=schemas.Employee)
def update_employee(employee_id: int,
                    employee: schemas.EmployeeCreate,
                    db: Session = Depends(get_db)):
    emp = crud.update_employee(db, employee_id, employee)

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    return emp


@router.delete("/{employee_id}")
def delete_employee(employee_id: int,
                    db: Session = Depends(get_db)):
    emp = crud.delete_employee(db, employee_id)

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee deleted successfully"}