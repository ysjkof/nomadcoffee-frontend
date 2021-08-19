import { ApolloProvider, useReactiveVar } from "@apollo/client";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import { HelmetProvider } from "react-helmet-async";
import routes from "./routes";
import CreateShop from "./screens/CreateShop";
import ShopProfile from "./screens/ShopProfile";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                <Home />
              </Route>
              <Route path={routes.add}>
                <CreateShop />
              </Route>
              <Route path={routes.shop}>
                <ShopProfile />
              </Route>
              <Route path={routes.login}>
                {isLoggedIn ? Redirect(routes.home) : <Login />}
              </Route>
              <Route path={routes.signup}>
                <SignUp />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
