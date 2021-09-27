import React from "react";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
// import { NavHashLink as NavLink } from "react-router-hash-link";
import AccountDetailsView from "./accountDetailsView";

class MyAccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  render() {
    return (
      <section>
        <h1>Hello</h1>
        <ul>
          <li>
            <Link to="/myaccount/accountdetails">Account Details</Link>
          </li>
          <li>{/* <NavLink to="/myaccount/orders">Orders</NavLink> */}</li>
          <li>{/* <NavLink to="/myaccount/reviews">Reviews</NavLink> */}</li>
        </ul>
        <div>
          <Route
            path="/myaccount/accountdetails"
            component={AccountDetailsView}
          />
        </div>
      </section>
    );
  }
}

export default MyAccountView;
