import React from "react";
import { Route as DefaultRoute, Switch } from "react-router-dom";
import Route from "./Route";
import AppContainer from "../components/AppContainer";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AddApplicationForm from "../pages/Applications/NewApplication/AddApplicationForm";
import Applications from "../pages/Applications/Applications";
import AllApplications from "../pages/Applications/AllApplications";
import Application from "../pages/Applications/Application";
import Users from "../pages/Users/Users";
import User from "../pages/Users/User";
import AddUser from "../pages/Users/AddAgency";
import UserProfile from "../pages/Users/UserProfile";

export default function Routes() {
  return (
    <Switch>
      <DefaultRoute path="/" exact component={LoginPage} />
      <DefaultRoute path="/register" exact component={AddUser} />
      <AppContainer>
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/all-users" exact component={Users} />
        <Route path="/user/:id" exact component={User} />
        <Route path="/user-profile" exact component={UserProfile} />
        <Route path="/my-applications" exact component={Applications} />
        <Route path="/all-applications" exact component={AllApplications} />
        <Route path="/new-application" exact component={AddApplicationForm} />
        <Route path="/application/:id" exact component={Application} />
      </AppContainer>
    </Switch>
  );
}
