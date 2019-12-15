import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
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
    .put(`/api/employees/${employee._id}`, empData)
    .then(() => history.push("/"))
    .catch(err =>
      setEmployee({
        ...employee,
        errors: err.response.data.errors
      })
    );
}

function onDelete(e, employee, setEmployee, history) {
  if (window.confirm("Are you sure you want to delete this employee?")) {
    axios
      .delete(`/api/employees/${employee._id}`)
      .then(() => history.push("/"))
      .catch(err =>
        setEmployee({
          ...employee,
          errors: err.response.data.errors
        })
      );
  }
}

function onChange(e, employee, setEmployee) {
  setEmployee({ ...employee, [e.target.name]: e.target.value });
}

export default function EditEmployee(props) {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    hireDate: "",
    role: "",
    errors: {}
  });
  const history = useHistory();

  // Load the employee data for editing
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/employees/${props.match.params.id}`);
      setEmployee({
        _id: res.data._id,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        role: res.data.role,
        hireDate: moment(res.data.hireDate)
          .utcOffset(0)
          .format("YYYY-MM-DD"),
        joke: res.data.joke,
        quote: res.data.quote,
        errors: {}
      });
    };
    fetchData();
  }, [props.match.params.id]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={"/"} className="btn btn-info">
              Back
            </Link>
            <h1 className="display-4 text-center">Edit Employee</h1>
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
              <h6>Favorite Joke</h6>
              <Input name="joke" value={employee.joke} disabled={true} />
              <h6>Favorite Quote</h6>
              <Input name="quote" value={employee.quote} disabled={true} />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
              <input
                type="button"
                value="Delete Employee"
                onClick={e => onDelete(e, employee, setEmployee, history)}
                className="btn btn-danger btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
