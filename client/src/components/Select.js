import React from "react";
import classnames from "classnames";

export default function SelectListGroup(props) {
  const optionElements = props.options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error
        })}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {optionElements}
      </select>
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
}
