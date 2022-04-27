import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productListReducer, productDetailsReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer
} from "./reducers/userReducers"
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer
} from "./reducers/orderReducers"

// Redux State
// - Dans le combineReducer on récupère tout ce que renvoient les autres reducers, ce qui en fait crée le state global de redux. 
// - Quand le reducer productListReducer return un loading à true et une liste de products, dans le state global de redux j'aurai une propriété productList qui contiendra deux sous propriétés héritées de productListReducer, à savoir le loading et la liste de products. 
// - Ensuite avec le useSelector on va chercher dans le state (le state global de redux), la propriété productList qui nous intéresse pour accéder aux sous propriétés (loading ou liste de products).

// Dessous, notre state global redux va contenir comme propriétés productList, productDetails, cart..

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [ thunk ]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store