import './App.css';
import SearchScreen from "./components/Search/SearchScreen";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DetailsScreen from "./components/Search/DetailsScreen";
import HomeScreen from "./components/HomeScreen";
import Login from "./components/Login/Login";
import Profile from "./components/Login/Profile";
import Register from "./components/Login/Register";

import userReducer from "./reducers/user";
import {createStore} from "redux";
import {Provider} from "react-redux";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Popup from "./components/PrivacyPolicy/Popup";

const store = createStore(userReducer);

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container mt-3">
          <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/home" element={<HomeScreen/>}/>
            <Route path="/search" element={<SearchScreen/>}/>
            <Route path="/search/:searchTerm" element={<SearchScreen/>}/>
            <Route path="/details/:id"  element={<DetailsScreen/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile/:profileId" element={<Profile/>}/>
            <Route path="/policy" element={<PrivacyPolicy/>}/>
          </Routes>
            <Popup/>
          </div>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
