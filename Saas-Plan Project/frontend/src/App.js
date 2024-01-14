import React from 'react';

import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Plans from './superadmin/component/Plans';
import AddPlans from './superadmin/component/AddPlans';
import UpdatePlans from './superadmin/component/UpdatePlans';
import Home from './admin/Home'
import Cart from './cart/Cart';
import Signup from './auth/component/Signup';
import Login from './auth/component/Login';
import Checkout from './cart/Checkout';
import LandingPage from './user/LandingPage';
import RegistrationForm from './admin/RegistrationForm';
import Navbar from './admin/Navbar';
import AdminOrder from './order/AdminOrder';
import StripeCheckout from './payment/StripeCheckout';
import Dashboard from './admin/Dashboard';

const router=createBrowserRouter([
  {
    path:'/',
    element:(
      <Login/>
    )
  },
  {
    path:'/signup',
    element:(
      <Signup/>
    )
  },
  {
    path:'/Dashboard',
    element:(
      <Dashboard/>
    )
  },
  {
  path:'/Admin/checkout',
  element:(
    <Navbar><Checkout/></Navbar>
    
  ),
},
{
  path:'/Admin/order',
  element:(
    <Navbar><AdminOrder/></Navbar>
   
  )
},
{
  path:'/Admin/registration',
  element:(
    <Navbar><RegistrationForm/></Navbar>
  ),
},
{
  path:"/User",
  element:(
   <LandingPage/>
    
  )
},


{
  path:'/Admin',
  element:(
    <Navbar><Home/></Navbar>
   
  )
},
{
  path:'/Admin/cart',
  element:(
    <Navbar> <Cart/></Navbar>
   
  )
},
{
  path:'/SuperAdmin/updateplans/:_id',
  element:(
    <UpdatePlans/>
  )
},
{
  path:'/SuperAdmin/addplans',
  element:(
   <AddPlans/>
  )
},
{
  path:'/SuperAdmin',
  element:(
    <Plans/>
  )
},
{
  path:'/Admin/payment',
  element:(
   <StripeCheckout/>
  )
},
])
function App() {
 
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
