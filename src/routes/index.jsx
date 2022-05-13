import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

export const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </>
  );
};
