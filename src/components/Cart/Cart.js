import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = (props) => {
  const { name, id, imageURL, fare, status } = props.cart;
  return (
    <Link style={{ textDecoration: "none" }} to={`/destination/${id}`}>
      <div className="card">
        <img src={imageURL} class="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
