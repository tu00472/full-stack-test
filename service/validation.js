"use strict";

const empty = val =>
  !val ||
  (typeof val === "object" && Object.keys(val).length === 0) ||
  (typeof val === "string" && val.trim().length === 0);

const ROLES = ["CEO", "VP", "MANAGER", "LACKEY"];

exports.MISSING_FIRSTNAME_MSG = "First name is required.";
exports.MISSING_LASTNAME_MSG = "Last name is required.";
exports.MISSING_HIREDATE_MSG = "Hire date is required.";
exports.MISSING_ROLE_MSG = "Role is required.";
exports.INVALID_ROLE_MSG = "Invalid role.";
exports.INVALID_HIREDATE_MSG = "Hire date must be in the past.";

/**
 * Validate input data when creating or updating employees.
 *
 * @param {Object} params The values provided to the service from the user
 */
exports.validate = params => {
  const errors = {};

  if (empty(params.firstName)) {
    errors.firstName = exports.MISSING_FIRSTNAME_MSG;
  }

  if (empty(params.lastName)) {
    errors.lastName = exports.MISSING_LASTNAME_MSG;
  }

  if (empty(params.role)) {
    errors.role = exports.MISSING_ROLE_MSG;
  } else if (!ROLES.includes(params.role.trim().toUpperCase())) {
    errors.role = exports.INVALID_ROLE_MSG;
  }

  if (empty(params.hireDate)) {
    errors.hireDate = exports.MISSING_HIREDATE_MSG;
  } else {
    const hireDate = new Date(params.hireDate);
    if (hireDate >= new Date(new Date().toDateString())) {
      errors.hireDate = exports.INVALID_HIREDATE_MSG;
    }
  }

  return errors;
};
