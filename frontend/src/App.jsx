import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    position: "",
    email: "",
    salary: "",
  });

  const loadEmployees = async () => {
    const res = await api.get("/employees/");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addEmployee = async () => {
    await api.post("/employees/", {
      ...form,
      salary: Number(form.salary),
    });

    setForm({
      employee_id: "",
      name: "",
      position: "",
      email: "",
      salary: "",
    });

    loadEmployees();
  };

  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);
    loadEmployees();
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <input
        name="employee_id"
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={handleChange}
      />

      <input
        name="name"
        placeholder="Employee Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="position"
        placeholder="Position"
        value={form.position}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="salary"
        placeholder="Salary"
        value={form.salary}
        onChange={handleChange}
      />

      <button onClick={addEmployee}>Add Employee</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.employee_id}</td>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.email}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => deleteEmployee(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;