import React from "react";
import { Route as DefaultRoute, Switch } from "react-router-dom";
import Route from "./Route";
import AppContainer from "../components/AppContainer";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import CovidInfo from "../pages/CovidInfo";
import AddApplicationForm from "../pages/Applications/NewApplication/AddApplicationForm";
import Applications from "../pages/Applications/Applications";
import LabApplicationsByDate from "../pages/Applications/LabApplicationsByDate";
import AllMyPaidApplications from "../pages/Applications/AllMyPaidApplications";
import AllPaidApplications from "../pages/Applications/AllPaidApplications";
import AllMyNotPaidApplications from "../pages/Applications/AllMyNotPaidApplications";
import AllNotPaidApplications from "../pages/Applications/AllNotPaidApplications";
import AllApplications from "../pages/Applications/AllApplications";
import Application from "../pages/Applications/Application";
import Users from "../pages/Users/Users";
import User from "../pages/Users/User";
import AddUser from "../pages/Users/AddAgency";
import AddUserByAdmin from "../pages/Users/AddUser";
import UserProfile from "../pages/Users/UserProfile";
import CreditSummary from "../pages/Credits/CreditSummary";

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
        <Route
          path="/admin-user-registration"
          exact
          component={AddUserByAdmin}
        />
        <Route path="/my-applications" exact component={Applications} />
        <Route
          path="/my-applications/paid"
          exact
          component={AllMyPaidApplications}
        />
        <Route
          path="/all-applications/paid"
          exact
          component={AllPaidApplications}
        />
        <Route
          path="/my-applications/not-paid"
          exact
          component={AllMyNotPaidApplications}
        />
        <Route
          path="/lab-date-report"
          exact
          component={LabApplicationsByDate}
        />
        <Route
          path="/all-applications/not-paid"
          exact
          component={AllNotPaidApplications}
        />
        <Route path="/all-applications" exact component={AllApplications} />
        <Route path="/new-application" exact component={AddApplicationForm} />
        <Route path="/application/:id" exact component={Application} />
        <Route path="/credit-summary" exact component={CreditSummary} />
        <Route path="/covid-info" exact component={CovidInfo} />
      </AppContainer>
    </Switch>
  );
}
