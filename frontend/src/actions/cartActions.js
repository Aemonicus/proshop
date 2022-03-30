import axios from "axios"
import { CART_ADD_ITEM } from "../constants/cartConstants"


export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data_id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  // getState va tapper dans le state redux global, il faut d'abord taper dans la propriété globale cart puis redescendre
  // Le résultat doit être envoyé sour forme de string car on ne peut stocker que des strings dans le localStorage, d'où l'utilisation de JSON.stringify()
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}