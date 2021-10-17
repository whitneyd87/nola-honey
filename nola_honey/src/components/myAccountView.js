import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import AccountDetailsView, {
  OrderHistoryView,
  ReviewsHistoryView,
} from "./helpers/accountHelper";

class MyAccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.component = {
      accountdetails: AccountDetailsView,
      orders: OrderHistoryView,
      reviews: ReviewsHistoryView,
    };
  }
  render() {
    const { path } = this.props.match;
    return (
      <div>
        <ul>
          <li>
            <Link to={`${path}/accountdetails`}>Account Details</Link>
          </li>
          <li>
            <Link to={`${path}/orders`}>Orders</Link>
          </li>
          <li>
            <Link to={`${path}/reviews`}>Reviews</Link>
          </li>
        </ul>
        <div>
          <Switch>
            <Route
              exact
              path={`${path}/accountdetails`}
              component={AccountDetailsView}
            />
            <Route exact path={`${path}/orders`} component={OrderHistoryView} />
            <Route
              exact
              path={`${path}/reviews`}
              component={ReviewsHistoryView}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default MyAccountView;
