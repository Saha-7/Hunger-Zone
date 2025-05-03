// import { useParams } from "react-router-dom";
// import Shimmer from "./Shimmer";
// import useRestaurantMenu from "../utils/useRestaurantMenu";
// import RestaurantCategory from "./RestaurantCategory";


// const RestaurantMenu = () => {
    

//     const { resId } = useParams();

//     const dummy = "Dummy data"

//     const resInfo = useRestaurantMenu(resId)

    

//     if (resInfo === null) return <Shimmer />;

//     const {
//         name,
//         costForTwoMessage,
//         cuisines
//     } = resInfo?.data?.cards[2]?.card?.card?.info

//    const {itemCards}= resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
 
//    // console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards)

//     const categories = resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].filter( 
//         (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
//         )

//         // console.log(categories)

//     return (
//         <div className="text-center">
//             <h1 className="font-bold my-6 text-2xl"> {name} </h1>  
//             <p className="font-bold text-lg">

//             {cuisines?.join(", ")} - {costForTwoMessage}

//             </p>

//              {/*Categories Accordions */}
//              {
//                 categories.map((category) => (
//                     <RestaurantCategory 
//                        key={category?.card?.card.title} 
//                        data={category?.card?.card}
//                        showItems={true}
//                     />
//                 ))
//              }
//         </div>
//     );
// };

// export default RestaurantMenu;




import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  // Show loading state
  if (!resInfo || !resInfo.cards) return <Shimmer />;

  // Safely access restaurant details
  const restaurantInfo = resInfo?.cards?.[2]?.card?.card?.info;
  const name = restaurantInfo?.name;
  const costForTwoMessage = restaurantInfo?.costForTwoMessage;
  const cuisines = restaurantInfo?.cuisines;

  // Find all item categories
  const regularCards = resInfo?.cards?.find(
    (c) => c.groupedCard?.cardGroupMap?.REGULAR
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const categories = regularCards?.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold my-4">{name}</h1>
      <p className="text-gray-600">
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>

      {/* Categories Accordions */}
      {categories?.map((category, index) => (
        <RestaurantCategory
          key={index}
          data={category.card.card}
        />
      ))}
    </div>
  );
}; 

export default RestaurantMenu; 









