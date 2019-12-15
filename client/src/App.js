import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h4>Employee Admin</h4>
      </header>
      <div className="app-container">
        <Router>
          <Switch>
            <Route exact path="/" component={EmployeeList} />
            <Route exact path="/create-employee" component={CreateEmployee} />
            <Route exact path="/edit-employee/:id" component={EditEmployee} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
