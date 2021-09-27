import React from "react";
import axios from "axios";

function GenerateOrderDetails(props) {
  return (
    <section>
      <h1>Hi</h1>
    </section>
  );
}

class SingleOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
    };
  }

  getOrderDetails = async () => {
    try {
      const orderID = this.props.match.params;
      const data = await axios.get("");
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getOrderDetails()
      .then((res) => this.setState({ order: res.data.order }))
      .catch((err) => console.error(err));
  }

  render() {
    const order = this.state.order;
    return <section>{order && <GenerateOrderDetails order={order} />}</section>;
  }
}

export default SingleOrderView;
export { GenerateOrderDetails };
