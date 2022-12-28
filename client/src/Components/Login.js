import axios from "axios";
import React, { useState } from "react";
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
import "./Login.css";
import SimpleImageSlider from "react-simple-image-slider";
import SearchBar from "./searchBar";

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
  const images = [
    {
      url: "https://www.shopivo.com/blog/wp-content/uploads/2019/11/Black-Friday-Sales-Plan-Header.png",
    },
    {
      url: "https://wallpaper.dog/large/249812.jpg",
    },
    {
      url: "https://image.winudf.com/v2/image/Y29tLndhbGxwYXBlcnNob2VzZGVzaWduLnRjc3N0dWRpb19zY3JlZW5fM18xNTIyNjU4MzY0XzAxOA/screen-3.jpg?fakeurl=1&type=.webp",
    },
  ];

  const images1 = [
    {
      url: "https://image.winudf.com/v2/image/Y29tLndhbGxwYXBlcnNob2VzZGVzaWduLnRjc3N0dWRpb19zY3JlZW5fM18xNTIyNjU4MzY0XzAxOA/screen-3.jpg?fakeurl=1&type=.webp",
    },
    {
      url: "https://wallpaper.dog/large/249812.jpg",
    },
    {
      url: "https://www.shopivo.com/blog/wp-content/uploads/2019/11/Black-Friday-Sales-Plan-Header.png",
    },
  ];

  return (
    <div className="mainDiv">
      <div className="title">
        <div onClick={landingPage}>Hollamart</div>
        <SearchBar />
        <div className="navSignIn" onClick={signInPage}>
          Sign In
        </div>
        <div className="navSignUp" onClick={regPage}>
          Sign Up
        </div>
      </div>

      <div className="slider">
        <SimpleImageSlider
          width={windowWidth * 0.8}
          height={windowHeight * 0.5}
          images={images}
          showBullets={true}
          showNavs={true}
          style={myStyles.inputField}
        />
      </div>

      {/* <div
        style={{
          marginTop: windowHeight * 0.24,
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
        className="mainImage"
      >
        <SimpleImageSlider
          width={windowWidth * 0.7}
          height={windowHeight * 0.7}
          images={images1}
          showBullets={true}
          showNavs={true}
          style={myStyles.inputField}
        />
      </div> */}

      <div>
        <img
          src={
            "https://media.cnn.com/api/v1/images/stellar/prod/221127083329-underscored-cm-lead-img-early-deals-jpg.jpg?c=16x9&q=h_720,w_1280,c_fill"
          }
          className="mainImage"
        />
        <img
          src={
            "https://image.winudf.com/v2/image/Y29tLndhbGxwYXBlcnNob2VzZGVzaWduLnRjc3N0dWRpb19zY3JlZW5fM18xNTIyNjU4MzY0XzAxOA/screen-3.jpg?fakeurl=1&type=.webp"
          }
          className="mainImage"
          style={{ marginTop: windowHeight * 0.05 }}
        />
      </div>
      <div className="second-part">
        {/* <div className="reg-part">
          <div className="newuser">New User?</div>
          <div className="forreg">
            <button className="reg-btn" onClick={regPage}>
              Register
            </button>
          </div>
        </div> */}
        {/* <div className="login-part">
          <div className="login-one">
            <label htmlFor="email" className="foremail">
              Email
            </label>
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
          <div className="login-two">
            <label htmlFor="password" className="forpassword">
              Password
            </label>
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
          <div className="login-three">
            <button className="forsignin-btn" onClick={signin}>
              Sign In
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

const myStyles = StyleSheet.create({
  form: {
    textAlign: "center",
  },
  inputField: {
    padding: windowHeight * 0.1,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: windowWidth * 0.05,
    marginRight: windowWidth * 0.05,
    backgroundColor: "#FFFFF7",
    textAlign: "center",
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
