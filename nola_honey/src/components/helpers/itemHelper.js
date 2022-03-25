import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";

// Shop Index
function GenerateItemsIndex(props) {
  const items = props.items;
  return items.map((item, i) => (
    <div className="item-wrapper" key={i}>
      <NavLink className="item-link" to={`/shop/${item._id}`}>
        <figure className="item-figure">
          <img
            className="item-image"
            src={item.image[0].url}
            alt={item.title}
          ></img>
        </figure>
        <h4 className="item-title">
          {item.title} {item.itemType}
        </h4>
        <p className="item-price">${item.price}</p>
      </NavLink>
    </div>
  ));
}

// Item View
function Options(props) {
  const options = props.options;
  return options.map((option, i) => (
    <option key={i} data-qty={option.quantity}>
      {option.size}
    </option>
  ));
}

function Selection(props) {
  return (
    <div>
      <label>Select Size:</label>
      <select className="item-selection" name="size" onChange={props.onChange}>
        <option></option>
        <Options options={props.inventory} />
      </select>
    </div>
  );
}

const GenerateItemForm = React.forwardRef((props, ref) => {
  const item = props.item;
  const orderInventory = props.orderInventory ?? false;
  return (
    <div>
      <h4 className="item-title">
        {item.title} {item.itemType}
      </h4>
      <p className="item-description">{item.description}</p>
      <p className="item-price">Price: ${item.price}</p>
      <div className="selection-wrapper">
        {orderInventory ? (
          orderInventory.map((inv, i) => {
            return (
              <div key={i} className="item-qty-wrapper">
                {inv.size && <p className="item-size">Size: {inv.size}</p>}
                <label>Qty:</label>
                <input
                  onChange={props.onChange}
                  className="item-qty"
                  min="1"
                  max={item.inventory[0].quantity}
                  name="quantity"
                  type="number"
                  ref={ref}
                  defaultValue={inv.quantity}
                ></input>
              </div>
            );
          })
        ) : (
          <div className="item-size-qty-wrapper">
            {item.inventory[0].size && (
              <Selection
                onChange={props.onChange}
                size={item.inventory[0].size}
                inventory={item.inventory}
              />
            )}
            <div>
              <label>Select Qty:</label>
              <input
                onChange={props.onChange}
                className="item-qty"
                min="1"
                max={item.inventory[0].quantity}
                name="quantity"
                type="number"
                ref={ref}
              ></input>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const GenerateItemPreview = React.forwardRef((props, ref) => {
  const item = props.item;
  return (
    <div className="item-wrapper">
      <figure className="item-figure">
        <img
          className="item-image"
          src={item.image[0].url}
          alt={item.title}
        ></img>
      </figure>
      <form onSubmit={props.onSubmit}>
        <GenerateItemForm
          item={item}
          onChange={props.onChange}
          ref={ref}
          maxQty={props.maxQty}
        />
        <input className="item-btn" type="submit" value="add to pot"></input>
      </form>
    </div>
  );
});

// Item Details
function GenerateItemDetails(props) {
  const item = props.item;
  const orderInventory = props.orderInventory;
  return (
    <div className="item-wrapper" id={item._id}>
      <figure className="item-figure">
        <img
          className="item-image"
          src={item.image[0].url}
          alt={item.itemType}
        />
      </figure>
      <div className="title-wrapper">
        <p className="item-title">
          {item.title} {item.itemType}
        </p>
        <p className="item-dept">{item.department}</p>
      </div>
      {orderInventory.map((inv, i) =>
        inv.size === null ? (
          <div className="selection-wrapper" key={i}>
            <p className="item-qty">Qty: {inv.quantity}</p>
          </div>
        ) : (
          <div key={i} className="selection-wrapper">
            <p className="item-size">Size: {inv.size}</p>
            <p className="item-qty">Qty: {inv.quantity}</p>
          </div>
        )
      )}
    </div>
  );
}

// Cart View
function GenerateCartItems(props) {
  const items = props.items;

  return (
    <div className="cart-items">
      <div>
        <NavLink to="/shop/mycart/checkout">
          <button className="form-btn" type="submit">
            Proceed to Checkout
          </button>
        </NavLink>
      </div>
      {items.map((item, i) => (
        <div key={i} className="cart-item-wrapper">
          <GenerateItemDetails
            item={item._id}
            orderInventory={item.orderInventory}
          />
          <div className="btn-wrapper">
            <NavLink to="/shop/mycart/edit">
              <button className="form-btn">Edit</button>
            </NavLink>
            <button className="form-btn" type="submit" onClick={props.onClick}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Edit Cart View
function GenerateEditCart(props) {
  const items = props.items;
  return items.map((item, i) => (
    <div className="item-wrapper" key={i} id={`key-${i}`}>
      <form onSubmit={props.onSubmit}>
        <GenerateItemForm
          item={item._id}
          orderInventory={item.orderInventory}
          onChange={props.onChange}
        />
        <input className="item-btn" type="submit" value="update"></input>
      </form>
    </div>
  ));
}

function GenerateItemAdded(props) {
  const item = props.item;
  const orderInventory = props.orderInventory;
  const itemsPreview = props.items;
  return (
    <div className="item-added-wrapper">
      <div className="item-details-wrapper">
        <h1>Success!</h1>
        <GenerateItemDetails item={item} orderInventory={orderInventory} />
        <NavLink className="btn-link" to="/shop/mycart">
          <button className="form-btn">Go to Cart</button>
        </NavLink>
      </div>
      <div className="continue-shopping">
        <NavLink className="btn-link" to="/shop">
          <button className="form-btn">Continue Shopping</button>
        </NavLink>
        <GenerateItemsIndex items={itemsPreview} />
      </div>
    </div>
  );
}

// Checkout View
function GenerateCartPreview(props) {
  const items = props.items;
  return (
    <section>
      {items.map((item, i) => (
        <div key={i}>
          <GenerateItemDetails
            item={item._id}
            orderInventory={item.orderInventory}
          />
        </div>
      ))}
    </section>
  );
}

export default GenerateItemsIndex;
export {
  GenerateItemDetails,
  GenerateItemPreview,
  GenerateItemAdded,
  GenerateCartItems,
  GenerateCartPreview,
  GenerateEditCart,
};
