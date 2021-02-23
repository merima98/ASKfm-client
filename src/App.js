import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./features/home/Home";
import Login from "./features/login/Login";
import Signup from "./features/signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
