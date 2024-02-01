import React from 'react';
import { lazy, Suspense, useEffect, useState } from "react"
import ReactDOM from 'react-dom/client';
import Body from './components/Body'
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Cart from './components/Cart';


const Grocery = lazy(() => import("./components/Grocery"))


const AppLayout = () => {

const[userName, setUserName] = useState()
    useEffect(() =>{
        // Make a API call for user details
        const data = {
            name: "Pritam",
        }
        setUserName(data.name)
    }, [])

  return (
    <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser: userName}}>
            <div className="app">
              <Header />
              <Outlet />
            </div>
        </UserContext.Provider>
    </Provider>  
  );
};


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: < Error />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading .....</h1>}><Grocery /></Suspense>,
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ],
    },
    
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <RouterProvider router={appRouter} />
  
);
