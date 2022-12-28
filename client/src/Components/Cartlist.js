import axios from "axios";
import React, { useEffect, useState } from "react";
import Cartprod from "./Cartprod";
import "./Cartlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./searchBar";

// import Addresscomp from './Addresspopup'
import Addresspopup from "./Addresspopup";
const landingPage = () => {
  window.location.href = "/";
};
const routeToCartList = () => {
  window.location.href = "/cartlist";
};
function Cartlist() {
  const home = localStorage.getItem("home");
  // console.log(typeof(home))

  const street = localStorage.getItem("street");
  const city = localStorage.getItem("city");
  const pincode = localStorage.getItem("pincode");
  const currUser = localStorage.getItem("userID");
  const currToken = localStorage.getItem("token");
  const [cartProducts, setCartProducts] = useState([]);
  const [prodLen, setProdLen] = useState(0);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState({
    house_name: "",
    street_name: "",
    city_name: "",
    pin_code: "",
  });
  const [editAddress, setEditAddress] = useState({
    house_name: home,
    street_name: street,
    city_name: city,
    pin_code: pincode,
  });
  const [editShow, setEditShow] = useState(false);

  const config = {
    headers: {
      token: currToken,
    },
  };

  const addAddressHandler = () => {
    setShow(!show);
  };
  const addingAddress = () => {
    axios
      .post(
        `http://localhost:8080/addhomeaddress?id=${currUser}`,
        address,
        config
      )
      .then((res) => {
        console.log("address added");
        setShow(!show);
        localStorage.setItem("home", address.house_name);
        localStorage.setItem("street", address.street_name);
        localStorage.setItem("city", address.city_name);
        localStorage.setItem("pincode", address.pin_code);
        window.location.href = "/cartlist";
      });
  };

  const editingAddress = () => {
    axios
      .put(
        `http://localhost:8080/edithomeaddress?id=${currUser}`,
        editAddress,
        config
      )
      .then((res) => {
        console.log("address added");
        setEditShow(!editShow);
        localStorage.setItem("home", editAddress.house_name);
        localStorage.setItem("street", editAddress.street_name);
        localStorage.setItem("city", editAddress.city_name);
        localStorage.setItem("pincode", editAddress.pin_code);
        window.location.href = "/cartlist";
      });
  };
  const editAddressHandler = () => {
    setEditShow(!editShow);
  };
  const routeToAllProd = () => {
    window.location.href = "/productview";
  };
  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const productviewPage = () => {
    window.location.href = "/productview";
  };

  const checkout = () => {
    window.location.href = "/checkout";
  };

  useEffect(async () => {
    await axios
      .get(`http://localhost:8080/cartitems?id=${currUser}`, config)
      .then((res) => {
        console.log(res);
        setCartProducts(res.data);
        setProdLen(res.data.length);
      });
  }, []);
  return (
    <div className="parentcont">
      {prodLen ? (
        <div>
          <div className="head-listcart">
            <div className="title">
              <div onClick={landingPage}>Hollamart</div>
              <div onClick={productviewPage} className="availableprod">
                Products
              </div>

              <SearchBar />
            </div>
            <div className="faCartShoppingIcon1">
              <FontAwesomeIcon
                icon={faSignOut}
                size="3x"
                onClick={logoutUser}
                className="faSignOut"
              />
            </div>
          </div>

          <div>
            {cartProducts.map((cartprod) => {
              return <Cartprod {...cartprod} />;
            })}
          </div>
          <div className="login-three">
            <button onClick={checkout} className="forsignin-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="head-listcart">
            <div className="title">
              <div onClick={landingPage}>Hollamart</div>
              <div onClick={productviewPage} className="availableprod">
                Products
              </div>
            </div>
            <div className="faCartShoppingIcon">
              <FontAwesomeIcon
                icon={faSignOut}
                size="3x"
                onClick={logoutUser}
                className="faSignOut"
              />
            </div>
          </div>

          <div>
            {cartProducts.map((cartprod) => {
              return <Cartprod {...cartprod} />;
            })}
          </div>
          <div className="login-three1">
            <button onClick={productviewPage} className="forsignin-btn">
              Add Items
              <p style={{ marginTop: 100 }}>
                {" "}
                YOUR BAG IS EMPTY. Once you add something to your bag, it will
                appear here. Ready to get started?
              </p>
            </button>
          </div>
        </div>
        // <div className="emptycart">
        //   Oops, your Cart Is Empty......
        //   <div className="add-prod">
        //     Want to Add few products from store into your cart?
        //     <button className="clickme-btn" onClick={routeToAllProd}>
        //       Click Here
        //     </button>
        //   </div>
        // </div>
      )}
      <div className="foraddress-btn"></div>
    </div>
  );
}

export default Cartlist;
