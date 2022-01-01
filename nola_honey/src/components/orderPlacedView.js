import React from "react";
import axios from "axios";
import { NavHashLink as NavLink } from "react-router-hash-link";
import { GenerateOrderDetails } from "./helpers/orderHelper";

class OrderSuccessView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      orderID: null,
    };
  }

  getOrderData = async () => {
    try {
      const { orderID } = this.props.match.params;
      console.log(orderID);
      const data = await axios.get(`http://localhost:3001/order/${orderID}`, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getOrderData()
      .then((res) => this.setState({ order: res.data.order }))
      .catch((err) => console.error(err));
  }

  render() {
    const order = this.state.order;
    console.log(order);
    return (
      <section>
        <h1>Success! Order Placed!</h1>
        {order && <GenerateOrderDetails order={order} />}
      </section>
    );
  }
}

export default OrderSuccessView;
