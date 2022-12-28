import axios from "axios";
import React, { useEffect, useState } from "react";
import Cartprod from "./Cartprod";
import "./checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

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
        window.location.href = "/checkout";
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
        window.location.href = "/checkout";
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
      {/* <div className="gotocart"> */}
      {/* <div onClick={landingPage} className="availableprod">
          Hollamart
        </div> */}
      {/* <div className="faCartShoppingIcon">
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
        </div>{" "} */}
      {/* <button className="forgotocartbtn" onClick={logoutUser}>
            Logout
          </button> */}
      {/* </div> */}
      {prodLen ? (
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

          <div className="parent-address">
            <div className="address">
              <div className="home-add">Delivery Address</div>
              <br></br>
              <div>
                <span className="home-add">Home: {home}</span>
              </div>
              <br />
              <br />
              <div>
                <span className="home-add">Street: {street}</span>
              </div>
              <br />
              <br />
              <div>
                <span className="home-add">City: {city}</span>
              </div>
              <br />
              <br />
              <div>
                <span className="home-add">Pincode: {pincode}</span>
              </div>
              <br />
              <br />
            </div>
            {home == null || home == "" ? (
              <button
                onClick={addAddressHandler}
                className="forhandlingaddress"
              >
                Add Address
              </button>
            ) : (
              <button
                className="forhandlingaddress"
                onClick={editAddressHandler}
              >
                Edit Address
              </button>
            )}
            {home == null || home == "" ? (
              <div>please select an address to deliver</div>
            ) : (
              <div className="placeorder">
                <button onClick={productviewPage} className="forsignin-btn">
                  Place Order
                </button>
              </div>
            )}
          </div>
          {show && (
            <Addresspopup
              content={
                <>
                  <label>Home:</label>
                  <input
                    className="housenum"
                    name="house_name"
                    onChange={(e) => {
                      setAddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  <label>Street:</label>
                  <input
                    className="streetname"
                    name="street_name"
                    onChange={(e) => {
                      setAddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  <label>City:</label>
                  <input
                    className="cityname"
                    name="city_name"
                    onChange={(e) => {
                      setAddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  <label>Pincode:</label>
                  <input
                    className="pincodee"
                    name="pin_code"
                    onChange={(e) => {
                      setAddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  <button onClick={addingAddress}>proceed</button>
                </>
              }
              handleClose={addAddressHandler}
            />
          )}
          {editShow && (
            <Addresspopup
              content={
                <>
                  <label>Home:</label>
                  <input
                    className="housenum"
                    name="house_name"
                    value={editAddress.house_name}
                    onChange={(e) => {
                      setEditAddress({
                        ...editAddress,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  <label>Street:</label>
                  <input
                    className="streetname"
                    name="street_name"
                    value={editAddress.street_name}
                    onChange={(e) => {
                      setEditAddress({
                        ...editAddress,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  <label>City:</label>
                  <input
                    className="cityname"
                    name="city_name"
                    value={editAddress.city_name}
                    onChange={(e) => {
                      setEditAddress({
                        ...editAddress,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  <label>Pincode:</label>
                  <input
                    className="pincodee"
                    name="pin_code"
                    value={editAddress.pin_code}
                    onChange={(e) => {
                      setEditAddress({
                        ...editAddress,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  <button onClick={editingAddress}>proceed</button>
                </>
              }
              handleClose={editAddressHandler}
            />
          )}
        </div>
      ) : (
        <div className="emptycart">
          Oops, your Cart Is Empty......
          <div className="add-prod">
            Want to Add few products from store into your cart?
            <button className="clickme-btn" onClick={routeToAllProd}>
              Click Here
            </button>
          </div>
        </div>
      )}
      <div className="foraddress-btn"></div>
    </div>
  );
}

export default Cartlist;
