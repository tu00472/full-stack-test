const validation = require("./validation");

const validate = validation.validate;

test("all valid", () => {
  expect(
    validate({
      firstName: "Foo",
      lastName: "Bar",
      hireDate: "10-01-1970",
      role: "CEO"
    })
  ).toEqual({});
});

test("missing first name", () => {
  expect(validate({ firstName: " " })).toHaveProperty(
    "firstName",
    validation.MISSING_FIRSTNAME_MSG
  );
  expect(validate({})).toHaveProperty(
    "firstName",
    validation.MISSING_FIRSTNAME_MSG
  );
});

test("missing last name", () => {
  expect(validate({ lastName: " " })).toHaveProperty(
    "lastName",
    validation.MISSING_LASTNAME_MSG
  );
  expect(validate({})).toHaveProperty(
    "lastName",
    validation.MISSING_LASTNAME_MSG
  );
});

test("missing role", () => {
  expect(validate({ role: "  " })).toHaveProperty(
    "role",
    validation.MISSING_ROLE_MSG
  );
  expect(validate({})).toHaveProperty("role", validation.MISSING_ROLE_MSG);
});

test("invalid role", () => {
  expect(validate({ role: "invalidrole" })).toHaveProperty(
    "role",
    validation.INVALID_ROLE_MSG
  );
});

test("missing hire date", () => {
  expect(validate({ lastName: " " })).toHaveProperty(
    "hireDate",
    validation.MISSING_HIREDATE_MSG
  );
  expect(validate({})).toHaveProperty(
    "hireDate",
    validation.MISSING_HIREDATE_MSG
  );
});

test("hiredate in future", () => {
  expect(validate({ hireDate: "2100-10-01" })).toHaveProperty(
    "hireDate",
    validation.INVALID_HIREDATE_MSG
  );
});
