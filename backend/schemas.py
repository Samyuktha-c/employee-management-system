from pydantic import BaseModel


class EmployeeBase(BaseModel):
    employee_id: str
    name: str
    position: str
    email: str
    salary: float


class EmployeeCreate(EmployeeBase):
    pass


class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True