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
import MyTrips from "./pages/MyTrips";
import NewsFeed from "./pages/NewsFeed";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import Axios from "axios";
import Pusher from 'pusher-js';

function App() {
  const [isNewNotification, setIsNewNotification] = useState();
  // const [currentUserId, setCurrentUser] = useState();

  function checkNotificationStatus(status) {
    if (status === "Booked") {
      setIsNewNotification(1);
    }
  }

  // Get current logged in user
  let currentUserId;
  const getUser = () => {
    Axios
      .get("/api/users/current-user")
      .then((res) => {
        console.log("Current User ID", res.data.data._id);
        currentUserId = res.data.data._id;
        subscribeToPusherChannel(currentUserId);
        return true;
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  };
  getUser();

  // ---------------- CHANNELS ------------------ //
  const subscribeToPusherChannel = (currentUserId) => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher("29fa452f5422eea823e5", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("private-user-" + currentUserId);
    channel.bind("request-booked", function (data) {
      alert(
        JSON.stringify(
          "Good News! Booking Confirmed: " +
            data.requestData.from +
            " to " +
            data.requestData.to
        )
      );
    });
  };

  return (
    <Router>
      <Layout>
        <NotificationContext.Provider value={isNewNotification}>
          <Nav notificationStatus={isNewNotification} />
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
              <RequestsReceived
                checkNotificationStatus={checkNotificationStatus}
              />
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
