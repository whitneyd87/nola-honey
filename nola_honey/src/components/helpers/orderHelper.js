import React from "react";
import { GenerateCartPreview } from "./itemHelper";

function GenerateAddresses(props) {
  return (
    <form>
      {/* name */}
      <label>First Name</label>
      <input name="firstName" type="text"></input>
      <label>Last Name</label>
      <input name="lastName" type="text"></input>
      {/* street  */}
      <label>Street Address</label>
      <input name="streetNum" type="text"></input>
      {/* city */}
      <label>City</label>
      <input name="city" type="text"></input>
      {/* state and code */}
      <label>State</label>
      <input name="state" type="text"></input>
      <label>Zip Code</label>
      <input name="zipCode" type="number"></input>
    </form>
  );
}

function GenerateAddressForm(props) {
  const onChange = props.onChange;
  const type = props.type;
  return (
    <form>
      <h2>Please Enter {type.toUpperCase()} Address</h2>
      {/* name */}
      <label>First &amp; Last Name</label>
      <input name="name" type="text" onChange={onChange}></input>
      {/* street  */}
      <label>Street Address</label>
      <input name="streetNo" type="text" onChange={onChange}></input>
      {/* city */}
      <label>City</label>
      <input name="city" type="text" onChange={onChange}></input>
      {/* state and code */}
      <label>State</label>
      <input name="state" type="text" onChange={onChange}></input>
      <label>Zip Code</label>
      <input name="zipCode" type="text" onChange={onChange}></input>
    </form>
  );
}

function GeneratePaymentForm(props) {
  const onChange = props.onChange;
  return (
    <form>
      <label>Name on Card</label>
      <input type="text" name="cardName" onChange={onChange}></input>
      <label>Select One:</label>
      <div>
        <input
          type="radio"
          name="vendor"
          onChange={onChange}
          value="VISA"
        ></input>
        <label>Visa</label>
        {/* <img></img> */}
      </div>
      <div>
        <input
          type="radio"
          name="vendor"
          onChange={onChange}
          value="MASTERCARD"
        ></input>
        <label>Mastercard</label>
        {/* <img></img> */}
      </div>
      <div>
        <input
          type="radio"
          name="vendor"
          onChange={onChange}
          value="AMERICAN EXPRESS"
        ></input>
        <label>American Express</label>
        {/* <img></img> */}
      </div>
      <div>
        <input
          type="radio"
          name="vendor"
          onChange={onChange}
          value="DISCOVER"
        ></input>
        <label>Discover</label>
        {/* <img></img> */}
      </div>
      <label>Card Number</label>
      <input type="text" name="cardNo" onChange={onChange}></input>
      <label>CVV</label>
      <input type="text" max="4" name="cvv" onChange={onChange}></input>
      <label>Expires:</label>
      <input
        type="text"
        name="expires"
        placeholder="mm/yy"
        onChange={onChange}
      ></input>
    </form>
  );
}

function GenerateOrderDetails(props) {
  const order = props.order;
  const shipping = order.shipping[0];
  const payment = order.paymentMethod[0];
  return (
    <div>
      <h1>These are the details:</h1>
      <h3>Items</h3>
      <GenerateCartPreview items={order.items} />
      <h3>Shipped To:</h3>
      <p>
        {shipping.firstName} {shipping.lastName}
      </p>
      <p>
        {shipping.streetNo}, {shipping.city}, {shipping.state}{" "}
        {shipping.zipCode}
      </p>
      <h3>Payment Method:</h3>
      <p>
        Card: {payment.vendor} Last Four: {payment.cardID}
      </p>
    </div>
  );
}

export default GenerateAddressForm;
export { GeneratePaymentForm, GenerateOrderDetails };
