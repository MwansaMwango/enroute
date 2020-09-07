import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Books from "./pages/Books";
import Layout from "./pages/Layout";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Drive from "./pages/Drive";
import Ride from "./pages/Ride";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestsReceived from "./pages/RequestsReceived";
import MyRequests from "./pages/MyRequests";
import Nav from "./components/Nav";
import NotificationContext from "./utils/NotificationContext";
import MyTrips from "./pages/MyTrips"
import NewsFeed from "./pages/NewsFeed";
// import NotificationCenter from "react-notification-center-component";

function App() {

  const [isNewNotification, setIsNewNotification] = useState();

  function checkNotificationStatus(status) {
    if (status === "Booked") {
      setIsNewNotification(1);
    } 
  }

  return (
    <Router>
      <Layout>
        <NotificationContext.Provider value={isNewNotification}>
          <Nav notificationStatus={isNewNotification}/>
          <Switch>
            <Route exact path={["/", "/login"]}>
              <Login />
            </Route>
            <Route exact path="/drive">
              <Drive />
            </Route>
            <Route exact path="/mytrips">
              <MyTrips />
            </Route>
            <Route exact path="/register" component={Register} />
            <Route exact path="/newsfeed" component={NewsFeed} />
            <Route exact path="/myrequests">
              <MyRequests />
            </Route>
            <Route exact path="/trips/:id">
              <RequestsReceived checkNotificationStatus={checkNotificationStatus} />
            </Route>
            <Route exact path="/requestsreceived">
              <RequestsReceived />
            </Route>
            <Route exact path="/ride">
              <Ride />
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
        </NotificationContext.Provider>
      </Layout>
    </Router>
  );
}

export default App;


