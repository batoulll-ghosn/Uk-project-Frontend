import React, { useReducer } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";

import StudentComponent from "./UserDashboard/userDashboard";
import TeacherComponent from "./UserDashboard/userDashboard";
import Dashboard from "./DashboardComponents/sideBar";
import {getUserRole } from '../Data/getData';
const Dash = () => {
    const userRole = getUserRole();
    const navigate = useNavigate();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    userRole === "admin" ? (
                        <Dashboard />
                    ) : userRole === "trainer" ? (
                        <TeacherComponent />
                    ) : userRole === "student" ? (
                        <StudentComponent />
                    ) : (
                        <navigate to="/login" />
                    )
                }
            />
        </Routes>
    );
};

export default Dash;