"use strict";

const axios = require("axios");
const express = require("express");
const uuid = require("uuid/v1");
const validate = require("./validation").validate;

const router = express.Router();

const EMPLOYEE_NOT_FOUND_MSG = "Employee not found.";

const DATABASE = {};

/**
 * Return all current records
 */
router.get("", function (req, res) {
  return res.send(Object.values(DATABASE));
});

/**
 * Return the record corresponding to the id parameter
 */
router.get("/:id", (req, res) => {
  const employee = DATABASE[req.params.id];
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ errors: { message: EMPLOYEE_NOT_FOUND_MSG } });
  }
});

/**
 * Create a new record using a randomly generated value as the unique identifier (i.e. _id field).
 */
router.post("", (req, res) => {
  const employee = populateEmployee(req, res);
  if (employee) {
    employee._id = uuid();

    fetchQuoteAndJoke()
      .then(results => {
        Object.assign(employee, results);
        DATABASE[employee._id] = employee;
        res.json(employee);
      })
      .catch(err => res.status(500).json(err));
  }
});

/**
 * Delete the record corresponding to the id parameter
 */
router.delete("/:id", (req, res) => {
  const employee = DATABASE[req.params.id];
  if (employee) {
    delete DATABASE[req.params.id];
    res.json({ success: true });
  } else {
    res.status(404).json({ errors: { message: EMPLOYEE_NOT_FOUND_MSG } });
  }
});

/**
 * Replace the record corresponding to :id with the contents of the PUT body
 */
router.put("/:id", (req, res) => {
  const existing = DATABASE[req.params.id];
  if (existing) {
    const employee = populateEmployee(req, res);
    if (employee) {
      employee._id = req.params.id;
      employee.quote = existing.quote;
      employee.joke = existing.joke;
      DATABASE[req.params.id] = employee;
      res.json(employee);
    }
  } else {
    res.status(404).json({ errors: { message: EMPLOYEE_NOT_FOUND_MSG } });
  }
});

/**
 * Retrieve a quote and a joke from external APIs.
 */
async function fetchQuoteAndJoke() {
  const quoteResponse = await axios.get(
    "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
  );
  const jokeResponse = await axios.get("https://icanhazdadjoke.com", {
    headers: { Accept: "text/plain" }
  });
  return {
    quote: quoteResponse.data[0],
    joke: jokeResponse.data
  };
}

/**
 * Shared code for creating an employee object from request data,
 * and returning error responses if necessary.
 *
 * Returns the modified employee if successful, null otherwise.
 */
function populateEmployee(req, res) {
  const errors = validate(req.body);

  if (Object.keys(errors).length) {
    res.status(400).json({ errors });
    return null;
  }

  const employee = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    role: req.body.role.trim(),
    hireDate: new Date(req.body.hireDate)
  };

  if (employee.role === "CEO") {
    // If employee is new, or is not currently the existing CEO, throw an error.
    const existingCEO = Object.values(DATABASE).find(emp => emp.role === "CEO");

    if (existingCEO && existingCEO._id !== req.params.id) {
      res.status(400).json({ errors: { role: "A CEO already exists." } });
      return null;
    }
  }

  return employee;
}

module.exports = router;
