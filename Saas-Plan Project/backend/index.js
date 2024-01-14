const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const session=require('express-session');
const server=express();
const cookieParser=require('cookie-parser');
server.use(express.json()); 
server.use(express.urlencoded({extended:true}));
server.use(cookieParser());
server.use(express.static("public"));
server.use(cors({ origin: 'http://localhost:3000',credentials: true,}))
server.use(session({
  secret: 'SECRET_KEY', 
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure:false,
    maxAge:1000*60*60*24
  }
}))
const auth=require('./controller/Auth')
const plans=require('./controller/Plans')
const cart=require('./controller/Cart')
const order=require('./controller/Order')
const router=express.Router();
server.use(router)


                                       // Routing...
router.post('/auth',auth.createUser);
router.get('/auth',auth.loginUser);
router.patch('/auth/:_id',auth.updateUser)
router.get('/auth/admin',auth.fetchAllUser)

router.post('/cart',cart.addToCart)
      .get('/cart/:userid',cart.fetchToCart) 
      .delete('/cart/:_id',cart.removeToCart)
   

 router.post('/order',order.createOrder)
       .get('/order/:adminid',order.fetchUserOrder)     


router.get('/plans',plans.fetchPlans)
      .post('/plans/',plans.AddPlans)
      .delete('/plans/:_id',plans.deletePlans)
      .patch('/plans/:_id',plans.updatePlans)


//     for Payment

      const stripe = require("stripe")('sk_test_51OYClFSBmB9EfXdGYDjQoyG5caww53VeSHIlPy7uRzYZ9zDEAGa96QMMSWqOOmkOpIAf46oZAAGKymbOuV560wRs00OFU2HUc5');
      
      const calculateOrderAmount = (items) => {
        return 9000;
      };
      
      server.post("/create-payment-intent", async (req, res) => {
        const { items } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(items),
          currency: "inr",
          automatic_payment_methods: {
            enabled: true,
          },
        });
      
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      });

///  Database connection

main().catch(error=>console.log(error))
async function main(){
    await mongoose.connect('mongodb+srv://amareshranjan252:93YDKzqoTQNa064z@cluster0.hoerrl6.mongodb.net/?retryWrites=true&w=majority')
    console.log('database connected')
}

///server setup
server.listen(8080,()=>{
    console.log('starting server at 8080'); 
})