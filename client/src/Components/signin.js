import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCart } from "@fortawesome/free-solid-svg-icons";

import "./signin.css";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
var windowHeight = Dimensions.get("window").height;
var windowWidth = Dimensions.get("window").width;
function Login() {
  const [data, setData] = useState({ Email: "", Password: "" });
  const signin = async () => {
    console.log(data);
    await axios
      .post(`http://localhost:8080/users/login`, data)
      .then(async (response) => {
        await localStorage.setItem("token", response.data.token);
        await localStorage.setItem("userID", response.data.user_id);
        if (response.data.address.length != 0) {
          await localStorage.setItem(
            "home",
            response.data.address[0].house_name
          );
          await localStorage.setItem(
            "street",
            response.data.address[0].street_name
          );
          await localStorage.setItem(
            "city",
            response.data.address[0].city_name
          );
          await localStorage.setItem(
            "pincode",
            response.data.address[0].pin_code
          );
        }
        console.log(response);
        if (response.status === 200) {
          window.location.href = "/productview";
        } else {
          window.location.href = "/";
        }
      });
  };
  const regPage = () => {
    window.location.href = "/register";
  };

  const signInPage = () => {
    window.location.href = "/signin";
  };

  const landingPage = () => {
    window.location.href = "/";
  };

  return (
    <div className="mainDiv">
      <div className="title">
        <div onClick={landingPage}>Hollamart</div>
        <div className="navSignIn" onClick={signInPage}>
          Sign In
        </div>
        <div className="navSignUp" onClick={regPage}>
          Sign Up
        </div>
      </div>
      <div>


    </div>
    <div>
    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
  </div>
      <div>
        {" "}
        <div className="second-part">
          <div className="login-part">
            <label
              style={{
                padding: 10,
              }}
              htmlFor="email"
              className="foremail"
            >
              Email
            </label>

            <div className="login-one">
              <input
                id="email"
                className="foremailinp"
                name="Email"
                placeholder="Email here"
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <br />
            <label
              style={{
                padding: 10,
              }}
              htmlFor="password"
              className="forpassword"
            >
              Password
            </label>
            <div className="login-two">
              <input
                id="password"
                type="password"
                className="forpass"
                name="Password"
                placeholder="Password here"
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <br />

            {/* <TouchableOpacity
              style={[
                myStyles.inputField,
                { marginTop: windowHeight * 0.03, backgroundColor: "#e30914" },
              ]}
            >
              <Text
                style={myStyles.loginText}
                onPress={() => {
                  alert("You tapped the button!");
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity> */}

            <div className="login-three">
              <button className="forsignin-btn" onClick={signin}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const myStyles = StyleSheet.create({
  form: {
    textAlign: "center",
  },
  inputField: {
    padding: 6,
    color: "white",
    backgroundColor: "#474747",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 1.25,
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    borderRadius: 5,
  },
  continueButton: {
    backgroundColor: "#35b8b6",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    padding: windowHeight * 0.01,
  },
  formError: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginLeft: windowWidth * 0.1,
    marginRight: windowWidth * 0.1,
  },
});
export default Login;
