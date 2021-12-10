import React from "react";
import axios from "axios";
import { NavHashLink as NavLink } from "react-router-hash-link";
import { GenerateCartPreview } from "./helpers/itemHelper";
import GenerateAddressForm, {
  GeneratePaymentForm,
} from "./helpers/orderHelper";

class CheckoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      shipping: {
        firstName: null,
        lastName: null,
        streetNo: null,
        city: null,
        state: null,
        zipCode: null,
      },
      billing: {
        firstName: null,
        lastName: null,
        streetNo: null,
        city: null,
        state: null,
        zipCode: null,
      },
      sameBilling: true,
      paymentMethod: {
        cardName: null,
        vendor: null,
        cardNo: null,
        cvv: null,
        expires: null,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, type) {
    const address = { ...this.state[type] };
    const name = e.target.name;
    const value = e.target.value;
    if (name === "name") {
      const [firstName, lastName] = value.split(" ");
      address.firstName = firstName;
      address.lastName = lastName;
    } else {
      address[name] = value;
    }
    this.setState({
      [type]: address,
    });
  }

  handleCheck(e) {
    const sameBilling = e.target.value === "true";
    this.setState({ sameBilling });
  }

  handleSubmit = async () => {
    try {
      const billing =
        this.state.billing.firstName === null
          ? this.state.shipping
          : this.state.billing;
      const data = await axios.put(
        "http://localhost:3001/order",
        {
          items: this.state.items,
          shipping: this.state.shipping,
          billing: billing,
          paymentMethod: this.state.paymentMethod,
        },
        { withCredentials: true }
      );
      console.log("Form submitted");
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
    const sameBilling = this.state.sameBilling;
    console.log(this.state.shipping);
    return (
      <section>
        {items && (
          <div>
            <NavLink to="/shop/mycart">
              <button>Back to Cart</button>
            </NavLink>
            <GenerateCartPreview items={items} />
            <GenerateAddressForm
              type="shipping"
              onChange={(e) => this.handleChange(e, "shipping")}
            />
            {/* same as billing */}
            <h3>Use the same addres for billing?</h3>
            <input
              type="radio"
              value="true"
              onChange={(e) => this.handleCheck(e)}
              name="sameBilling"
            />
            <label>Yes</label>
            <input
              type="radio"
              name="sameBilling"
              value="false"
              onChange={(e) => this.handleCheck(e)}
            />
            <label>No</label>
            {!sameBilling && (
              <GenerateAddressForm
                type="billing"
                onChange={(e) => this.handleChange(e, "billing")}
              />
            )}
            <GeneratePaymentForm
              onChange={(e) => this.handleChange(e, "paymentMethod")}
            />
            <button onClick={this.handleSubmit}>Place Order</button>
          </div>
        )}
      </section>
    );
  }
}

export default CheckoutView;
