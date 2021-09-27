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

  getCartData = async () => {
    try {
      const sessionID = localStorage.getItem("sessionID");
      const data = await axios.get(
        `http://localhost:3001/shop/:id/${sessionID}/mycart`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  updateCartData = async () => {
    try {
      const sessionID = localStorage.getItem("sessionID");
      const data = await axios.put(
        `http://localhost:3001/shop/:id/${sessionID}/mycart`,
        {
          updatedItems: this.state.updatedItems,
        }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  handleChange(e) {
    const currentItems = this.state.items;
    const el = e.target;
    const elName = el.name;
    const elValue = el.value;
    const elParent = el.closest(".item-wrapper");
    const elIndex = parseInt(elParent.id.slice(elParent.id.length - 1));
    const updatedItems = currentItems.map((item, i) => {
      if (i === elIndex && elName === "quantity")
        item[elName] = parseInt(elValue);
      if (i === elIndex && elName === "size") item[elName] = elValue;
      return item;
    });
    this.setState({
      updatedItems: updatedItems,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.updateCartData()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    this.setState({ formSubmitted: true });
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
    if (this.state.formSubmitted)
      return (
        <Redirect
          to={{ pathname: "/shop/mycart", state: { redirect: true } }}
        />
      );

    return (
      <section>
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
