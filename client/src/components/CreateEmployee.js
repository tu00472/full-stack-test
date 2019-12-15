import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Select from "./Select";
import roleOptions from "../utils/roleOptions";

function onSubmit(e, employee, setEmployee, history) {
  e.preventDefault();
  const empData = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    hireDate: employee.hireDate,
    role: employee.role
  };

  axios
    .post("/api/employees", empData)
    .then(() => history.push("/"))
    .catch(err =>
      setEmployee({
        ...employee,
        errors: err.response.data.errors
      })
    );
}

function onChange(e, employee, setEmployee) {
  setEmployee({ ...employee, [e.target.name]: e.target.value });
}

export default function CreateEmployee(props) {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    hireDate: "",
    role: "",
    errors: {}
  });
  const history = useHistory();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={"/"} className="btn btn-info">
              Back
            </Link>
            <h1 className="display-4 text-center">Create Employee</h1>
            <form onSubmit={e => onSubmit(e, employee, setEmployee, history)}>
              <h6>First Name</h6>
              <Input
                name="firstName"
                value={employee.firstName}
                onChange={e => onChange(e, employee, setEmployee)}
                error={employee.errors.firstName}
                required={true}
              />
              <h6>Last Name</h6>
              <Input
                name="lastName"
                value={employee.lastName}
                onChange={e => onChange(e, employee, setEmployee)}
                error={employee.errors.lastName}
                required={true}
              />
              <h6>Hire Date</h6>
              <Input
                type="date"
                name="hireDate"
                value={employee.hireDate}
                onChange={e => onChange(e, employee, setEmployee)}
                error={employee.errors.hireDate}
                required={true}
              />
              <h6>Role</h6>
              <Select
                name="role"
                value={employee.role}
                onChange={e => onChange(e, employee, setEmployee)}
                error={employee.errors.role}
                options={roleOptions}
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
