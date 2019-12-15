import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Select from "./Select";
import roleOptions from "../utils/roleOptions";

function onSubmit(e, state, setState, history) {
  e.preventDefault();
  const empData = {
    firstName: state.firstName,
    lastName: state.lastName,
    hireDate: state.hireDate,
    role: state.role
  };

  axios
    .post("/api/employees", empData)
    .then(() => history.push("/"))
    .catch(err =>
      setState({
        ...state,
        errors: err.response.data.errors
      })
    );
}

function onChange(e, state, setState) {
  setState({ ...state, [e.target.name]: e.target.value });
}

export default function CreateEmployee(props) {
  const [state, setState] = useState({
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
            <form onSubmit={e => onSubmit(e, state, setState, history)}>
              <h6>First Name</h6>
              <Input
                name="firstName"
                value={state.firstName}
                onChange={e => onChange(e, state, setState)}
                error={state.errors.firstName}
                required={true}
              />
              <h6>Last Name</h6>
              <Input
                name="lastName"
                value={state.lastName}
                onChange={e => onChange(e, state, setState)}
                error={state.errors.lastName}
                required={true}
              />
              <h6>Hire Date</h6>
              <Input
                type="date"
                name="hireDate"
                value={state.hireDate}
                onChange={e => onChange(e, state, setState)}
                error={state.errors.hireDate}
                required={true}
              />
              <h6>Role</h6>
              <Select
                name="role"
                value={state.role}
                onChange={e => onChange(e, state, setState)}
                error={state.errors.role}
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
