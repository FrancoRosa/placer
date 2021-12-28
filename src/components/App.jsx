import { Switch, Redirect, Route } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import model from "../js/model";

import Config from "./Config";
import Home from "./Home";
import Tabs from "./Tabs";
import NavDebug from "./NavDebug";
import LaserConfig from "./LaserConfig";

const store = createStore(model);

const App = () => {
  return (
    <div className="container is-fullwidth">
      <Tabs />
      <StoreProvider store={store}>
        <Switch>
          <Redirect exact from="/" to="/map" />
          <Route path="/config" component={Config} />
          <Route path="/laser" component={LaserConfig} />
          <Route path="/debug" component={NavDebug} />
          <Route path="/map" component={Home} />
        </Switch>
      </StoreProvider>
    </div>
  );
};

export default App;
