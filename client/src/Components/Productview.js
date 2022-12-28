import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Productview.css";
import Eachprod from "./Eachprod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./searchBar";

function Productview() {
  const userid = localStorage.getItem("userID");
  const [products, setProducts] = useState([]);
  const [prodLength, setProdLen] = useState(0);
  // const currToken = localStorage.getItem("token")
  const routeToCartList = () => {
    window.location.href = "/cartlist";
  };
  const landingPage = () => {
    window.location.href = "/";
  };
  const productviewPage = () => {
    window.location.href = "/productview";
  };
  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  useEffect(() => {
    axios.get("http://localhost:8080/users/viewproducts").then((res) => {
      console.log(res);
      setProducts(res.data);
      setProdLen(res.data.length);
    });
  }, []);
  return (
    <div>
      {prodLength && (
        <div className="gotocart">
          <div  onClick={landingPage}  className="availableprod">Hollamart</div>
          <div  onClick={productviewPage}  className="availableprod">Products</div>
          <SearchBar/>

          <div className="faCartShoppingIcon">
            <FontAwesomeIcon
              icon={faCartShopping}
              size="3x"
              onClick={routeToCartList}
              className="faCartShopping"
            />

            <FontAwesomeIcon
              icon={faSignOut}
              size="3x"
              onClick={logoutUser}
              className="faSignOut"
            />
          </div>{" "}
          {/* <button className="forgotocartbtn" onClick={logoutUser}>
            Logout
          </button> */}
        </div>
      )}
      {prodLength &&
        products.map((product) => {
          return <Eachprod {...product} />;
        })}
    </div>
  );
}

export default Productview;
