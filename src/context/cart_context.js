import { useEffect } from 'react';
import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/cartReducer';

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem('cartItems');

  if (localCartData === [] || localCartData === null) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};
console.log('getLocalCartData', getLocalCartData());
const initialState = {
  cart: getLocalCartData(),
  total_item: '',
  total_amount: '',
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, color, amount, product } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateItem = (id) => {
    dispatch({ type: 'INCREMENT_PRODUCT', payload: id });
  };

  const decrementItem = (id) => {
    dispatch({ type: 'DECREMENT_PRODUCT', payload: id });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, updateItem, decrementItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
