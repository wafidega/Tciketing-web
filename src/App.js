import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import PrivateRoute from "./helpers/routes/PrivateRoutes";
import PublicRoute from "./helpers/routes/PublicRoute";
import FormMovie from "./pages/FormMovie";
import Profile from "./pages/Profile";
import ProfileOrder from "./pages/ProfileOrder";
import AdminPage from "./pages/AdminPage";
import UpdateMovie from "./pages/UpdateMovie";
import FormSchedule from "./pages/FormSchedule";
import SearchMovie from "./pages/SearchMovie";
import TicketResult from "./pages/Ticket";

// Redux
import { Provider } from "react-redux";
import { store, persistor } from "./stores/store";
import { PersistGate } from "redux-persist/integration/react";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/detail" exact component={Detail} />
              <Route path="/order" exact component={Order} />
              <Route path="/payment" exact component={Payment} />
              <Route path="/search" exact component={SearchMovie} />
              <PublicRoute path="/form-movie" exact component={FormMovie} />
              <PublicRoute
                path="/form-schedule"
                exact
                component={FormSchedule}
              />
              <PublicRoute path="/profile" exact component={Profile} />
              <PublicRoute
                path="/profile-order"
                exact
                component={ProfileOrder}
              />
              <PublicRoute path="/admin-page" exact component={AdminPage} />
              <PublicRoute path="/update-movie" exact component={UpdateMovie} />
              <PublicRoute path="/ticket" exact component={TicketResult} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
