import React from "react";

class DeleteCartItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: true,
    };
  }
  render() {
    return (
      <section>
        <h1>ItemDeleted</h1>
      </section>
    );
  }
}

export default DeleteCartItemView;
