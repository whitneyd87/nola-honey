import React from "react";
import axios from "axios";
import { GenerateOrderDetails } from "./singleOrderView";

function GenerateOrderHistory(props) {
  const orders = props.orders;
  return orders.map((order, i) => {
    <div key={i}>
      <GenerateOrderDetails order={order} />
    </div>;
  });
}

// list of all orders with link to single order views
class OrderHistoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    };
  }

  getOrders = async () => {
    try {
      const user = null;
      const data = await axios.get("");
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getOrders()
      .then((res) => this.setState({ orders: res.data.orders }))
      .catch((err) => console.error(err));
  }

  render() {
    const orders = this.state.orders;
    return (
      <section>
        {/* {orders && <GenerateOrderHistory orders={orders} />} */}
        <h1>Hello!</h1>
      </section>
    );
  }
}

export default OrderHistoryView;
