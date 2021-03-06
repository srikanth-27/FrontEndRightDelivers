import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import SignIn from "./Containers/SignIn";
import SignUp from "./Containers/SignUp";
import Home from "./Containers/Home";
import ProductList from "./Components/Products/ProductList";
import RestaurantList from "./Components/Restaurants/RestaurantList";
import Dashboard from "./Containers/Dashboard";
import ProductDetail from "./Components/Products/ProductDetail";
import Checkout from "./Components/Checkout/Checkout";
import * as actionCreators from "./Store/actions/index";
import RListNew from "./Components/Restaurants/RListNew";

function App(props) {
  useEffect(() => {
    loadConfigData();
  }, []);

  const apiUrl = props.config.baseUrl + "configs";
  const loadConfigData = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    const res = await (await fetch(apiUrl, options)).json();
    if (res) {
      props.updateConfigData(res);
    }
  };
  return (
    <div className="" style={{ overflowX: "hidden" }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/:location" component={Home} />
        <Route exact path="/:location/:service" component={RListNew} />
        <Route
          exact
          path="/:location/:service/:restaurant"
          component={ProductList}
        />
        <Route
          exact
          path="/:location/:service/:restaurant/:product"
          render={() => <ProductDetail />}
        />
      </Switch>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateConfigData: (payload) =>
      dispatch(actionCreators.updateConfigData(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
