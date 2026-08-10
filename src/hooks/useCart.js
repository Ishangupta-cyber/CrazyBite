import { useSelector, useDispatch } from "react-redux"
import {
  addItem as addItemAction,
  removeOne as removeOneAction,
  removeEntry as removeEntryAction,
  clearCart as clearCartAction,
} from "../store/cartSlice"

const makeCartId = () => `${Date.now()}-${Math.random()}`

export const useCart = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  const addItem = (item) => {
    dispatch(addItemAction({ ...item, cartId: makeCartId() }))
  }

  const removeOne = (itemId) => {
    dispatch(removeOneAction(itemId))
  }

  const removeEntry = (cartId) => {
    dispatch(removeEntryAction(cartId))
  }

  const clearCart = () => {
    dispatch(clearCartAction())
  }

  const getItemCount = (itemId) =>
    cartItems.filter((entry) => entry.id === itemId).length

  const totalPrice = cartItems.reduce((sum, entry) => sum + entry.price, 0)

  return { cartItems, addItem, removeOne, removeEntry, clearCart, getItemCount, totalPrice }
}