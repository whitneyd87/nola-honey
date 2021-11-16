import React from "react";
import axios from "axios";
import { GenerateCartPreview } from "./helpers/itemHelper";
import GenerateAddressForm, {
  GeneratePaymentForm,
} from "./helpers/orderHelper";

class CheckoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      name: null,
      streetNo: null,
      city: null,
      state: null,
      zipCode: null,
      sameBilling: null,
      cardName: null,
      vendor: null,
      cardNo: null,
      cvv: null,
      expiration: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = async () => {
    try {
      const data = await axios.put(
        "http://localhost:3001/order",
        {
          items: this.state.items,
          addresses: [
            {
              name: this.state.name,
              streetNo: this.state.streetNo,
              city: this.state.city,
              state: this.state.state,
              zipCode: this.state.zipCode,
            },
          ],
          paymentMethod: [
            {
              cardNo: this.state.cardNo,
              vendor: this.state.vendor,
              cvv: this.state.cvv,
              expiration: this.state.expiration,
            },
          ],
        },
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  getCartData = async () => {
    try {
      // const data = await axios.get(`http://localhost:3001/shop/mycart`);
      // return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem("cartItems"));
    this.setState({ items });
    // this.getCartData()
    // .then((res) => this.setState({ items: res.data.items }))
    // .catch((err) => console.error(err));
  }

  render() {
    const items = this.state.items;
    return (
      <section>
        {items && (
          <div>
            <button>Back to Cart</button>
            <GenerateCartPreview items={items} />
            <GenerateAddressForm onChange={(e) => this.handleChange(e)} />
            <GeneratePaymentForm onChange={(e) => this.handleChange(e)} />
            <button onSubmit={this.handleSubmit}>Place Order</button>
          </div>
        )}
      </section>
    );
  }
}

export default CheckoutView;
