import axios from "axios";
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
      userInfo: null,
      orderHistory: null,
      reviewsHistory: null,
    };
  }

  getUserInfo = async (req, res) => {
    try {
      const data = await axios.get("http://localhost:3001/myaccount", {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getUserInfo()
      .then((res) =>
        this.setState({
          userInfo: res.data.addresses,
          orderHistory: res.data.orders,
          reviewsHistory: res.data.reviews,
        })
      )
      .catch((err) => console.error(err));
  }
  render() {
    const { path } = this.props.match;
    const userInfo = this.state.userInfo;
    const orderHistory = this.state.orderHistory;
    const reviewsHistory = this.state.reviewsHistory;
    return (
      <div>
        {userInfo && (
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
                  render={() => <AccountDetailsView userInfo={userInfo} />}
                />
                <Route
                  exact
                  path={`${path}/orders`}
                  render={() => (
                    <OrderHistoryView orderHistory={orderHistory} />
                  )}
                />
                <Route
                  exact
                  path={`${path}/reviews`}
                  render={() => (
                    <ReviewsHistoryView reviewsHistory={reviewsHistory} />
                  )}
                />
              </Switch>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MyAccountView;
