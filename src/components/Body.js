import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer"
import useOnlineStatus from "../utils/useOnlineStatus";
import { Link } from "react-router-dom";
import { withPromotedLabel } from "./RestaurantCard";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  //console.log("Body Rendered");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard)
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
      
  const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
  const json = await data.json();
  
  //console.log(json); 
  // Log the entire JSON response
  
  // Optional chaining
  setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );
  

    return listOfRestaurants.length === 0 ? (
      <Shimmer />
    ) : (
      <div className="body bg-purple-100 text-gray-800">
        <div className="filter flex items-center m-5">
          <div className="search m-5 p-5">
            <input
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-700 border border-blue-300 p-2 rounded-lg"
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button className="p-2 bg-green-300 m-1 rounded-lg"
              onClick={() => {
                const filteredRestaurant = listOfRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredRestaurant(filteredRestaurant);
              }}
            >
              Search
            </button>
          </div>

          <div>
          <button
            className="p-2 bg-indigo-500 rounded-lg"
            onClick={() => {
              const filteredList = filteredRestaurant.filter((res) => res.info.avgRating > 4.2);
              setFilteredRestaurant(filteredList);
            }}
           >
            Top Rated Restaurants
          </button>
          </div>

          
        </div>
        <div className="flex flex-wrap justify-center">
          {filteredRestaurant.map((restaurant) => (
            <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>

            {
              restaurant.info.availability.opened ? (<RestaurantCardPromoted resData={restaurant}/>
              ) : (
                <RestaurantCard resData={restaurant}/>
              )
            }
            
            </Link>

          ))}
        </div>
      </div>
    );
};
  
export default Body;  