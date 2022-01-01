import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class DeleteCartItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedItem: this.props.location.state.deletedItem,
      redirect: false,
    };
  }

  deleteCartItem = async () => {
    try {
      const data = await axios.delete(
        `http://localhost:3001/shop/mycart`,
        { deletedItem: this.state.deletedItem },
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.deleteCartItem()
      .then((res) => {
        this.setState({ redirect: res.data.redirect });
      })
      .catch((err) => console.error(err));
  }

  render() {
    console.log(this.state.deletedItem);
    return (
      <section>
        {this.state.redirect && (
          <Redirect
            to={{ pathname: "/shop/mycart", state: { redirect: true } }}
          />
        )}
      </section>
    );
  }
}

export default DeleteCartItemView;
