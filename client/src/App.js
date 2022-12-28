import "./App.css";
//import Productview from "./Components/Productview";
import Login from "./Components/Login";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Components/Register";
import Productview from "./Components/Productview";
import Cartlist from "./Components/Cartlist";
import signin from "./Components/signin";
import checkout from "./Components/checkout";
import itemView from "./Components/itemView";
import searchBar from "./Components/searchBar";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signin" exact component={signin} />
            <Route path="/checkout" exact component={checkout} />
            <Route path="/item" exact component={itemView} />
            <Route path="/searchbar" exact component={searchBar} />

            <Route path="/register" exact component={Register} />
            <Route path="/productview" exact component={Productview} />
            <Route path="/cartlist" exact component={Cartlist} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
