import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export default function Employee({ employee }) {
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-8 col-sm-9 col-md-9 col-lg-10 col-xl-11">
          <h3>{`${employee.firstName} ${employee.lastName}`}</h3>
          <div>
            <span className="bold">Hire Date:</span>{" "}
            <Moment format="MMMM D, YYYY" utc="true">
              {employee.hireDate}
            </Moment>
          </div>
          <div>
            <span className="bold">Role:</span> {employee.role}
          </div>
          <div>
            <span className="bold">Favorite Joke:</span> {employee.joke}
          </div>
          <div>
            <span className="bold">Favorite Quote:</span> {employee.quote}
          </div>
        </div>
        <div className="col col-sm-3 col-md-3 col-lg-2 col-xl-1">
          <Link to={`/edit-employee/${employee._id}`} className="btn btn-info">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
