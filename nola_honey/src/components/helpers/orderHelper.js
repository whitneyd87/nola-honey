import React from "react";

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
      {/* submit */}
      <input type="submit">Submit</input>
    </form>
  );
}

function GenerateAddressForm(props) {
  const onChange = props.onChange;
  return (
    <form>
      {/* name */}
      <label for="name">First &amp; Last Name</label>
      <input name="name" type="text" onChange={onChange}></input>
      {/* street  */}
      <label for="streetNo">Street Address</label>
      <input name="streetNo" type="text" onChange={onChange}></input>
      {/* city */}
      <label for="city">City</label>
      <input name="city" type="text" onChange={onChange}></input>
      {/* state and code */}
      <label for="state">State</label>
      <input name="state" type="text" onChange={onChange}></input>
      <label for="zipCode">Zip Code</label>
      <input name="zipCode" type="number" onChange={onChange}></input>
      {/* same as billing */}
      <input type="checkbox" name="sameBilling" onChange={onChange} />
      <label for="sameBilling"> Same as Billing? </label>
    </form>
  );
}

function GeneratePaymentForm(props) {
  const onChange = props.onChange;
  return (
    <form>
      <label for="cardName">Name on Card</label>
      <input type="text" name="cardName" onChange={onChange}></input>
      <label for="vendor">Select One:</label>
      <div>
        <input type="radio" name="vendor" onChange={onChange}></input>
        <img></img>
      </div>
      <div>
        <input type="radio" name="vendor" onChange={onChange}></input>
        <img></img>
      </div>
      <div>
        <input type="radio" name="vendor" onChange={onChange}></input>
        <img></img>
      </div>
      <div>
        <input type="radio" name="vendor" onChange={onChange}></input>
        <img></img>
      </div>
      <label for="cardNo">Card Number</label>
      <input type="number" name="cardNo" onChange={onChange}></input>
      <label for="cvv">CVV</label>
      <input type="number" max="4" name="CVV" onChange={onChange}></input>
      <label for="expiration">Expires:</label>
      <input type="date"></input>
    </form>
  );
}

export default GenerateAddressForm;
export { GeneratePaymentForm };
