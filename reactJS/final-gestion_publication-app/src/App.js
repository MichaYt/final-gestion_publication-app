import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddPublication from "./components/add-publication.component";
import Publication from "./components/publication.component";
import PublicationsList from "./components/publications-list.component";

class App extends Component {
  render() {
    // Ajout Navbar
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/publications" className="navbar-brand">
            Gestion de publications
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/publications"} className="nav-link">
                Publications
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Ajout
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/publications"]} component={PublicationsList} />
            <Route exact path="/add" component={AddPublication} />
            <Route path="/publications/:id" component={Publication} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;