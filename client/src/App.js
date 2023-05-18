import React from "react";

import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Rule from "./layouts/rule";
import Login from "./layouts/login";
import LogOut from "./layouts/logout";
import Register from "./layouts/register";
import Deputy from "./layouts/deputy";

function App() {
  return (
    <Switch>
      <Route path="/rule/:ruleNumber/" component={Rule} />
      <Route path="/deputy/:deputyName" component={Deputy} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={LogOut} />
      <Route path="/register" component={Register} />
      <Route path="/" exact component={Main} />
    </Switch>
  );
}
export default App;
