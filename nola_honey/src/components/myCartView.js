import React from "react";
import axios from "axios";
import { GenerateCartItems } from "./helpers/itemHelper";

class MyCartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      sessionID: localStorage.getItem("sessionID"),
    };
    this._currentItemID = null;
    this._isMounted = false;
  }

  handleDelete(e) {
    const parentEl = e.target.closest(".item-wrapper");
    this._currentItemID = parentEl.id;
    this.setState({ deleteRequested: true });
  }

  getCartData = async () => {
    try {
      const sessionID = this.state.sessionID;
      const data = await axios.get(
        `http://localhost:3001/shop/:id/${sessionID}/mycart`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  deleteItem = async () => {
    try {
      const id = this._currentItemID;
      const sessionID = this.state.sessionID;
      const data = await axios.delete(
        `http://localhost:3001/shop/${id}/${sessionID}/mycart`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getCartData()
      .then((res) => this.setState({ items: res.data.items }))
      .catch((err) => console.error(err));
  }

  componentDidUpdate() {
    this._isMounted = true;
    this.getCartData()
      .then(
        (res) => this._isMounted && this.setState({ items: res.data.items })
      )
      .catch((err) => console.error(err));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const items = this.state.items;
    return (
      <section>
        {items && (
          <GenerateCartItems
            items={items}
            onClick={(e) => this.handleDelete(e)}
          />
        )}
      </section>
    );
  }
}

export default MyCartView;
