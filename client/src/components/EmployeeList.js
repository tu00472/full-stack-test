import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Employee from "./Employee";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  // Load the list of employees
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/employees");
      setEmployees(res.data);
    };
    fetchData();
  }, []);

  let employeeList;

  if (employees.length > 0) {
    employeeList = employees.map(emp => {
      return <Employee key={emp._id} employee={emp} />;
    });
  } else {
    employeeList = <h4>No employees found.</h4>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={"/create-employee"} className="btn btn-primary">
              Create Employee
            </Link>
            <h1 className="display-4 text-center">Employees</h1>
            {employeeList}
          </div>
        </div>
      </div>
    </>
  );
}
