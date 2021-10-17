import React from "react";
import routes from "./lists/routesList";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, withRouter } from "react-router-dom";

function GenerateRoutes(routes) {
  return routes.map((route, i) =>
    route.routes ? (
      <Route
        path={route.path}
        render={(props) => <route.component {...props} routes={route.routes} />}
        key={i}
      />
    ) : (
      <Route exact path={route.path} component={route.component} key={i} />
    )
  );
}

function MainView({ location }) {
  const nodeRef = React.useRef(null);

  return (
    <TransitionGroup className="main-wrapper">
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        in
        timeout={500}
        classNames="fade"
      >
        <main className="main">
          <Switch location={location}>{GenerateRoutes(routes)}</Switch>
        </main>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(MainView);
export { GenerateRoutes };
