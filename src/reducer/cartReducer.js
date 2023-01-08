const cartReducer = (state, action) => {
  // if (action.type === 'ADD_TO_CART') {
  //   // console.log('++++++++++++++', action.payload);
  //   let { id, color, amount, product } = action.payload;
  //   // console.log(
  //   //   "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
  //   //   product
  //   // );

  //   let cartProduct;

  //   cartProduct = {
  //     id: id + color,
  //     name: product.name,
  //     color,
  //     amount,
  //     image: product.image[0].url,
  //     price: product.price,
  //     max: product.stock,
  //     subTotal: product.price * amount,
  //   };

  //   // localStorage.setItem(
  //   //   'cartItems',
  //   //   JSON.stringify({
  //   //     ...state,
  //   //     cart: [...state.cart, cartProduct],
  //   //   })
  //   // );

  //   return {
  //     ...state,
  //     cart: [...state.cart, cartProduct],
  //   };
  // }

  if (action.type === 'ADD_TO_CART') {
    let { id, color, amount, product } = action.payload;
    // console.log(
    //   "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
    //   product
    // );

    let cartProduct;

    cartProduct = {
      id: id + color,
      name: product.name,
      color,
      amount,
      image: product.image[0].url,
      price: product.price,
      max: product.stock,
    };

    return {
      ...state,
      cart: [...state.cart, cartProduct],
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === 'INCREMENT_PRODUCT') {
    console.log('action.payload', action.payload);
    let receivedItem = action.payload;
    let itemList = state.cart;
    let stepToUpdate = itemList.findIndex((el) => el.id === receivedItem);
    // console.log(
    //   '...itemList[stepToUpdate]',
    //   stepToUpdate,
    //   itemList[stepToUpdate]
    // );

    itemList[stepToUpdate] = {
      id: itemList[stepToUpdate].id + itemList[stepToUpdate].color,
      name: itemList[stepToUpdate].name,
      color: itemList[stepToUpdate].color,
      amount: itemList[stepToUpdate].amount + 1,
      image: itemList[stepToUpdate].image,
      price: itemList[stepToUpdate].price,
      max: itemList[stepToUpdate].max,
      subTotal:
        (itemList[stepToUpdate].amount + 1) * itemList[stepToUpdate].price,
    };
    localStorage.setItem(
      'cartItems',
      JSON.stringify({ ...state, cart: itemList })
    );
    return { ...state, cart: itemList };

    // let updatedCart = state.cart.filter(
    //   (curItem) => curItem.id == action.payload
    // );

    // let cartProduct;

    // cartProduct = {
    //   id: updatedCart[0].id + updatedCart[0].color,
    //   name: updatedCart[0].name,
    //   color: updatedCart[0].color,
    //   amount: updatedCart[0].amount + 1,
    //   image: updatedCart[0].image,
    //   price: updatedCart[0].price,
    //   max: updatedCart[0].max,
    // };

    // return {
    //   ...state,

    // new card item add
    // cart: [...state.cart, cartProduct],

    // just card item update and replace
    //   cart: [cartProduct],
    // };
  }

  if (action.type === 'DECREMENT_PRODUCT') {
    let receivedItem = action.payload;
    let itemList = state.cart;
    let stepToUpdate = itemList.findIndex((el) => el.id === receivedItem);
    // console.log(
    //   '...itemList[stepToUpdate]',
    //   stepToUpdate,
    //   itemList[stepToUpdate]
    // );
    itemList[stepToUpdate] = {
      id: itemList[stepToUpdate].id + itemList[stepToUpdate].color,
      name: itemList[stepToUpdate].name,
      color: itemList[stepToUpdate].color,
      amount: itemList[stepToUpdate].amount - 1,
      image: itemList[stepToUpdate].image,
      price: itemList[stepToUpdate].price,
      max: itemList[stepToUpdate].max,
    };
    return { ...state, cart: itemList };
  }

  return state;
};

export default cartReducer;
