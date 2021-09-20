import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";

export default function GenerateShopItems(props) {
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

const GenerateForm = React.forwardRef((props, ref) => {
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

const GenerateItemDetails = React.forwardRef((props, ref) => {
  return (
    <div className="item-wrapper">
      <form onSubmit={props.onSubmit}>
        <GenerateForm
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

function GenerateCartItems(props) {
  const items = props.items;
  return items.map((item, i) => (
    <div className="item-wrapper" key={i} id={item._id._id}>
      <figure>
        <img src={item._id.image[0].url} alt={item._id.itemType} />
      </figure>
      <div>
        <p>
          {item._id.title} {item._id.itemType}
        </p>
        <p>{item._id.department}</p>
        {item.size && <p>Size: {item.size.toUpperCase()}</p>}
        <p>Qty: {item.quantity}</p>
        <p>Price: ${item._id.price}</p>
        <p>Total : ${parseInt(item._id.price) * parseInt(item.quantity)}</p>
      </div>
      <div>
        <NavLink to={`/shop/mycart/edit`}>
          <button>Edit</button>
        </NavLink>
        <button onClick={props.onClick}>Delete</button>
      </div>
    </div>
  ));
}

function GenerateEditCart(props) {
  const items = props.items;
  return items.map((item, i) => (
    <div className="item-wrapper" key={i} id={`key-${i}`}>
      <form onSubmit={props.onSubmit}>
        <GenerateForm
          item={item._id}
          quantity={item.quantity}
          size={item.size}
          onChange={props.onChange}
        />
        <input className="item-btn" type="submit" value="update"></input>
      </form>
    </div>
  ));
}

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
  const itemsPreview = props.items;
  return (
    <div>
      <figure>
        <img src={item.image[0].url} alt={item.itemType} />
      </figure>
      <div>
        <h1>Success!</h1>
        <p>
          {item.title} {item.itemType}
        </p>
        <p>{item.description}</p>
        <div>
          <p>Qty: {props.quantity}</p>
          {size && <p>Size: {size.toUpperCase()}</p>}
          <p>Price: ${item.price}</p>
        </div>
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

export {
  GenerateItemDetails,
  GenerateItemAdded,
  GenerateCartItems,
  GenerateEditCart,
};
