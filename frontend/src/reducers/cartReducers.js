import { CART_ADD_ITEM } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const shopItem = action.payload

      const existItem = state.cartItems.find(item => item.product === shopItem.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item => item.product === existItem.product ? shopItem : item)
        }
      } else {
        return {
          ...state,
          cartItems: [ ...state.cartItems, shopItem ]
        }
      }
    default:
      return state
  }
}