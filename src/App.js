import React from "react";

import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Rule from "./layouts/rule";
import Login from "./layouts/login";
import LogOut from "./layouts/logout";

function App() {
  return (
    <Switch>
      <Route path="/rules/:ruleNumber/" component={Rule} />
      <Route path="/rules" component={Rule} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={LogOut} />
      <Route path="/" exact component={Main} />
    </Switch>
  );
}
export default App;
