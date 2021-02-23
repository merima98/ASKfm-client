import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { useAuth } from "./state";
import {
  LOGGED_IN_DEFAULT_LAYOUT_ROUTES,
  LOGGED_OUT_NO_LAYOUT_ROUTES,
} from "./routing/routes";
import GlobalStyle from "./globalStyles.js";

const queryClient = new QueryClient();

function App() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  const defaultLayoutPaths = LOGGED_IN_DEFAULT_LAYOUT_ROUTES.map(
    (item) => item.path
  );
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        {isLoggedIn && (
          <Switch>
            <Route path={defaultLayoutPaths} exact>
              {LOGGED_IN_DEFAULT_LAYOUT_ROUTES.map((item) => {
                return (
                  <Route
                    key={item.path}
                    component={item.component}
                    path={item.path}
                    exact={item.exact}
                  />
                );
              })}
            </Route>
            <Route
              path={["/signup", "/login"]}
              component={() => <Redirect to="/" />}
            />
          </Switch>
        )}
        {!isLoggedIn && (
          <Switch>
            {LOGGED_OUT_NO_LAYOUT_ROUTES.map((item) => {
              return (
                <Route
                  key={item.path}
                  component={item.component}
                  path={item.path}
                  exact={item.exact}
                />
              );
            })}
          </Switch>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
