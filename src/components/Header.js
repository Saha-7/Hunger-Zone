import { LOGO_URL } from "../utils/constants";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Log In")

  useEffect(()=>{
    alert("You have to install CORS Browser Extension. Won't the data will not be fetched because of CORS Error.")
  },[])

  const onlineStatus = useOnlineStatus()

  const { loggedInUser } = useContext(UserContext)
  //console.log(loggedInUser);

  // Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items)
  //console.log(cartItems);

  return (
    <div className="flex justify-between bg-pink-200 shadow-lg sm:bg-yellow-300 lg:bg-green-200">
      <div className="logo-container">
        <img className="w-20 p-2 m-2" alt="app-logo" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="px-4 text-xl">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 text-xl">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4 text-xl">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4 text-blue-500 font-bold">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 font-bold text-xl text-amber-900">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <button
            className="login-btn bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              btnNameReact === "Log In"
                ? setBtnNameReact("Log Out")
                : setBtnNameReact("Log In")
            }}
          >
            {btnNameReact}
          </button>

          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
