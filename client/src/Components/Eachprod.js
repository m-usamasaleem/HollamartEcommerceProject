import React, { useState } from "react";
import axios from "axios";
import itemView from "./itemView";

import { Redirect } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Eachprod(props) {
  const itemViewPage = () => {
    <Route path="/item" element={<Redirect to="./item" />} />;

    //     <Redirect
    //   to={{
    //     pathname: "./item",
    //     state: { props: props }
    //   }}
    // />
    // window.location.href = "/item"  + props;
    // console.log("props",props);
    //   //return <itemView {...props} />;
  };
  const currToken = localStorage.getItem("token");
  const config = {
    headers: {
      token: currToken,
    },
  };
  const [show, setShow] = useState(true);
  const userid = localStorage.getItem("userID");
  const addToCart = () => {
    setShow(false);
    axios
      .post(
        `http://localhost:8080/addtocart?id=${props.Product_ID}&userID=${userid}`,
        props,
        config
      )
      .then(console.log("added to cart"));
  };
  return (
    <div className="each-prod">
      <div onClick={itemViewPage} className="prod">
        <div className="first-child">
          <img src={props.image} className="prod-img" />
        </div>
        <div className="second-child">
          <div className="left-child">
            <div className="prod-name">{props.product_name}</div>
            <div className="prod-price">${props.price}</div>
          </div>
          <div className="right-child">
            {show && (
              <button className="add-btn" onClick={addToCart}>
                Add to Bag
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eachprod;
