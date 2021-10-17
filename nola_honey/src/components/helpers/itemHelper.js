import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";

// Shop Index
function GenerateShopIndex(props) {
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
        <p className="item-description">{item.description}</p>
        <p>${item.price}</p>
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
      <select
        className="item-selection"
        name="size"
        defaultValue={props.size}
        onChange={props.onChange}
      >
        <option></option>
        <Options options={props.inventory} />
      </select>
    </div>
  );
}

const GenerateItemForm = React.forwardRef((props, ref) => {
  const item = props.item;
  return (
    <div>
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
      <p className="item-description">{item.description}</p>
      <p>Price: ${item.price}</p>
      <div className="selection-wrapper">
        {item.inventory[0].size && (
          <Selection
            onChange={props.onChange}
            size={props.size}
            inventory={item.inventory}
          />
        )}
        <label>Select Qty:</label>
        <input
          onChange={props.onChange}
          className="item-qty"
          min="1"
          max={props.maxQty}
          placeholder="Qty"
          name="quantity"
          type="number"
          ref={ref}
          defaultValue={props.quantity}
        ></input>
      </div>
    </div>
  );
});

const GenerateItemPreview = React.forwardRef((props, ref) => {
  return (
    <div className="item-wrapper">
      <form onSubmit={props.onSubmit}>
        <GenerateItemForm
          item={props.item}
          quantity={props.quantity}
          size={props.size}
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
  const size = props.size;
  const quantity = props.quantity;
  return (
    <div className="item-wrapper" id={item._id}>
      <figure>
        <img src={item.image[0].url} alt={item.itemType} />
      </figure>
      <div>
        <p>
          {item.title} {item.itemType}
        </p>
        <p>{item.department}</p>
        {size && <p>Size: {size.toUpperCase()}</p>}
        <p>Qty: {quantity}</p>
        <p>Price: ${item.price}</p>
        <p>Total : ${parseInt(item.price) * parseInt(quantity)}</p>
      </div>
    </div>
  );
}

// Cart View
function GenerateCartItems(props) {
  const items = props.items;
  return (
    <section>
      <div>
        <NavLink to="/shop/mycart/checkout">
          <button type="submit">Proceed to Checkout</button>
        </NavLink>
      </div>
      {items.map((item, i) => (
        <div key={i}>
          <GenerateItemDetails
            item={item._id}
            size={item.size}
            quantity={item.quantity}
          />
          <div>
            <NavLink to="/shop/mycart/edit">
              <button>Edit</button>
            </NavLink>
          </div>
          <div>
            <button type="submit" onClick={props.onClick}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </section>
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
          size={item.size}
          quantity={item.quantity}
          onChange={props.onChange}
        />
        <input className="item-btn" type="submit" value="update"></input>
      </form>
    </div>
  ));
}

// Item Added View
function GenerateShopPreview(props) {
  const items = props.items;
  return items.map((item, i) => (
    <div key={i}>
      <NavLink to={`/shop/${item._id}`}>
        <figure>
          <img src={item.image[0].url} alt={item.itemType} />
        </figure>
        <p>
          {item.title} {item.itemType}
        </p>
        <p>{item.department}</p>
        <p>Price: ${item.price}</p>
      </NavLink>
    </div>
  ));
}

function GenerateItemAdded(props) {
  const item = props.item;
  const size = props.size;
  const quantity = props.quantity;
  const itemsPreview = props.items;
  return (
    <div>
      <div>
        <h1>Success!</h1>
        <GenerateItemDetails item={item} size={size} quantity={quantity} />
        <NavLink to="/shop/mycart">
          <button>Go to Cart</button>
        </NavLink>
      </div>
      <div>
        <NavLink to="/shop">
          <button>Continue Shopping</button>
        </NavLink>
        <div>
          <GenerateShopPreview items={itemsPreview} />
        </div>
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
            size={item.size}
            quantity={item.quantity}
          />
        </div>
      ))}
    </section>
  );
}

export default GenerateShopIndex;
export {
  GenerateItemDetails,
  GenerateItemPreview,
  GenerateItemAdded,
  GenerateCartItems,
  GenerateCartPreview,
  GenerateEditCart,
};
