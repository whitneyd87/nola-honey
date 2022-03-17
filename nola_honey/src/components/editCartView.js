import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { GenerateEditCart } from "./helpers/itemHelper";

class EditCartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      updatedItems: null,
      formSubmitted: false,
    };
  }

  handleChange(e) {
    const currentItems = [...this.state.items];
    const el = e.target;
    const parent = el.closest(".item-wrapper");
    const elIndex = parseInt(parent.id.slice(parent.id.length - 1));
    const elSize = el.previousSibling.previousSibling;
    const size = elSize === null ? null : elSize.innerHTML.slice(-2).trim();
    const updatedItems = currentItems.map((item, i) => {
      if (i === elIndex)
        item.orderInventory.map((inv) =>
          inv.size === size ? (inv.quantity = parseInt(el.value)) : inv
        );
      return item;
    });
    this.setState({
      updatedItems: updatedItems,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.updateCartData()
      .then((res) =>
        this.setState({ updatedItems: res.data.items, formSubmitted: true })
      )
      .catch((err) => console.error(err));
  };

  getCartData = async () => {
    try {
      const data = await axios.get(`http://localhost:3001/shop/mycart`, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  updateCartData = async () => {
    try {
      const data = await axios.put(
        `http://localhost:3001/shop/mycart`,
        {
          updatedItems: this.state.updatedItems,
        },
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getCartData()
      .then((res) =>
        this.setState({ items: res.data.items, updatedItems: res.data.items })
      )
      .catch((err) => console.error(err));
  }

  render() {
    const items = this.state.items;
    const updatedItems = this.state.updatedItems;
    const formSubmitted = this.state.formSubmitted;
    return (
      <section>
        {formSubmitted && (
          <Redirect
            to={{
              pathname: "/shop/mycart",
              state: { redirect: true, items: updatedItems },
            }}
          />
        )}
        {items && (
          <GenerateEditCart
            onSubmit={this.handleSubmit}
            onChange={(e) => this.handleChange(e)}
            items={items}
          />
        )}
      </section>
    );
  }
}

export default EditCartView;
