import { CDN_URL } from "../utils/constants";


const RestaurantCard = (props) => {
    const {resData} = props;

    
  
    const { cloudinaryImageId,name,cuisines,avgRating,costForTwo,sla} = resData?.info; //destructuring with optional chaining
    const deliveryTime = sla?.deliveryTime; 

    
  
      return(
          <div className="m-4 p-4 w-56 rounded-lg bg-gray-400 text-black hover:bg-gray-500">
              <img 
              className="rounded-lg"
              alt="res-logo" 
              src={CDN_URL + cloudinaryImageId}
              />
              <h3 className="font-bold py-4 text-lg">{name}</h3>
              <h4 className="py-2 font-medium italic">{cuisines.join(", ")}</h4>
              <h4 className="font-extrabold py-2">{avgRating} ⭐ stars</h4>
              <h4 className="underline font-semibold py-2">{costForTwo}</h4>
              <h4 className="py-2 font-bold">{deliveryTime} minutes ⏳</h4>
          </div>
      )
};

export default RestaurantCard;


export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-gray-800 text-white rounded-lg m-1 p-2">Open</label>
                <RestaurantCard   {...props}/>
            </div>
        )
    }
}
