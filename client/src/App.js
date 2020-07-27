import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Drive from "./pages/Drive";
import Ride from "./pages/Ride";
import RequestsReceived from "./pages/RequestsReceived";
import RequestsCreated from "./pages/RequestsCreated";
import Nav from "./components/Nav";


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/", "/requestscreated"]}>
          <RequestsCreated />
          </Route>
          <Route exact path={"/requests"}>
          <RequestsReceived />
          </Route>
          <Route exact path="/ride">
          <Ride />
          </Route>
          <Route exact path="/drive">
          <Drive />
          </Route>
          <Route exact path="/books">
            <Books />
          </Route>
          <Route exact path="/books/:id">
            <Detail />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
