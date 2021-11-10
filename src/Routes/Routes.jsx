import { Route, Switch } from "react-router-dom";

import ChangePass from "../Components/Auth/ChangePass/ChangePass";
import CreateEvent  from "../Components/Boards/profile/Profile/CRUD/CreateEvent/CreateEvent";
import DashBoard from "../Components/Boards/profile/Profile/DashBoard/DashBoard";
import Home from "../Components/Layout/Home/Home";
import LoginPage from "../Components/Auth/LoginPage/LoginPage";
import ManageEvent from "../Components/Boards/profile/Profile/CRUD/ManageEvent/Manage Events";
import OtpPasswordReset from "../Components/Auth/PasswordReset/OtpPasswordReset/OtpPasswordReset";
import OtpSignUp from "../Components/Auth/SignUpPage/OtpSignUp/OtpSignup.jsx";
import PasswordResetPage from "../Components/Auth/PasswordReset/PasswordReset";
import SignUpPage from "../Components/Auth/SignUpPage/SignUpPage";

export const Routes = () => {
    return (
        <Switch>
            <Route
                path="/"
                exact
                component={Home}
            ></Route>
            <Route
                path="/PasswordResetPage"
                exact
                component={PasswordResetPage}
            ></Route>
            <Route
                path="/LogInPage"
                exact
                component={LoginPage}>
            </Route>
            <Route
                path="/SignUpPage"
                exact
                component={SignUpPage}>
            </Route>
            <Route
                path="/ChangePass"
                exact
                component={ChangePass}>
            </Route>
            <Route
                path="/OtpSignUp"
                exact
                component={OtpSignUp}>
            </Route>
            <Route
                path="/OtpPasswordReset"
                exact
                component={OtpPasswordReset}>
            </Route>
            <Route
                path="/CreateEvent"
                exact
                component={CreateEvent}>
            </Route>
            <Route
                path="/DashBoard"
                exact
                component={DashBoard}>
            </Route>
            <Route
                path="/ManageEvent"
                exact
                component={ManageEvent}>
            </Route>
        </Switch>
    );
};
