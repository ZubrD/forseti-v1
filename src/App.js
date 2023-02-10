import React from "react";

import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Rule from "./layouts/rule";

function App() {
  return (
    <Switch>
      <Route path="/rules/:ruleNumber/" component={Rule} />
      <Route path="/rules" component={Rule} />
      <Route path="/" exact component={Main} />
    </Switch>
  );
}
export default App;
