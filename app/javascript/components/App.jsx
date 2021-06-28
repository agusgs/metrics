import React from "react"
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import {Metrics} from "./Metrics";
import {Metric} from "./Metric";

const App = () => (
    <Router>
        <Navbar bg="light" expand="lg">
            <Link to="/">
                Metrics Visualization
            </Link>
        </Navbar>
        <Switch>
            <Route exact path="/">
                <Metrics/>
            </Route>
            <Route path="/metric/:id">
                <Metric/>
            </Route>
        </Switch>
    </Router>
)
export default App