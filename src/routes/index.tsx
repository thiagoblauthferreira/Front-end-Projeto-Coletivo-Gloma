import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { AuthRoute } from "./Auth/AuthRoute";
import { PrivateRoute } from "./Auth/PrivateRoute";
import { Layout } from "../layout";

import LoginPointScreen from "../pages/auth/login";
import SignUpScreen from "../pages/auth/register";
import SheltersScreen from "../pages/shelters";
import CoordinatorsScreen from "../pages/shelters/id";
import DistribuitionPointsScreen from "../pages/distribuition-points";
import DistribuitionPointScreen from "../pages/distribuition-points/id";
import  ProfileScreen from "../pages/profile"

export function RoutesPage() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route element={<LoginPointScreen />} path="/auth/login"></Route>
          <Route element={<SignUpScreen />} path="/auth/register"></Route>
        </Route>

        <Route element={<Layout />}>
          <Route path="/" element={<DistribuitionPointsScreen />} />
          <Route
            path="/distribuition-points/:id"
            element={<DistribuitionPointScreen />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/shelters" element={<SheltersScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shelters/:id" element={<CoordinatorsScreen />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
